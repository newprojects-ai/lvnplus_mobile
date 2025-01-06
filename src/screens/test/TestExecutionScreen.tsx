import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TestStackParamList} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Icon} from '@rneui/themed';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestExecution'>;

type Question = {
  id: string;
  content: string;
  options: string[];
  correctAnswer?: string;
};

export const TestExecutionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const dispatch = useAppDispatch();

  // Local state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [testStartTime] = useState(new Date());

  // Mock questions - replace with actual data from API
  const [questions] = useState<Question[]>([
    {
      id: '1',
      content: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
    },
    // Add more mock questions
  ]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeRemaining !== null) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            handleTestComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId],
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleTestComplete = useCallback(async () => {
    try {
      const endTime = new Date();
      const totalTime = Math.floor(
        (endTime.getTime() - testStartTime.getTime()) / 1000,
      );
      
      await dispatch(completeTestSession()).unwrap();
      
      navigation.replace('TestCompletion', {
        testId: currentQuestion.id,
        totalTime,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to submit test. Please try again.',
        [
          {
            text: 'Retry',
            onPress: handleTestComplete,
          },
        ],
      );
    }
  }, [navigation, testStartTime, dispatch, currentQuestion.id]);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isQuestionFlagged = flaggedQuestions.includes(currentQuestion.id);

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      {timeRemaining !== null && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            Time Remaining: {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      )}

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <TouchableOpacity
          onPress={() => handleFlagQuestion(currentQuestion.id)}
          style={styles.flagButton}>
          <Icon
            name={isQuestionFlagged ? 'flag' : 'flag-outline'}
            type="material-community"
            color={isQuestionFlagged ? '#ff6b6b' : '#666'}
            size={24}
          />
        </TouchableOpacity>
      </View>

      {/* Question Content */}
      <ScrollView style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.content}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answers[currentQuestion.id] === option &&
                  styles.optionButtonSelected,
              ]}
              onPress={() => handleAnswerSelect(currentQuestion.id, option)}>
              <Text
                style={[
                  styles.optionText,
                  answers[currentQuestion.id] === option &&
                    styles.optionTextSelected,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, isFirstQuestion && styles.navButtonDisabled]}
          onPress={handlePreviousQuestion}
          disabled={isFirstQuestion}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        {isLastQuestion ? (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={handleTestComplete}>
            <Text style={[styles.navButtonText, styles.submitButtonText]}>
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextQuestion}
            disabled={isLastQuestion}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  timerContainer: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  progressText: {
    fontSize: 14,
    color: '#6c757d',
  },
  flagButton: {
    padding: 8,
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    color: '#212529',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    backgroundColor: '#e7f5ff',
    borderColor: '#339af0',
  },
  optionText: {
    fontSize: 16,
    color: '#495057',
  },
  optionTextSelected: {
    color: '#1971c2',
    fontWeight: '500',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#37b24d',
  },
  submitButtonText: {
    color: '#fff',
  },
});
