import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import {TestTimer} from '../../utils/TestTimer';
import {SafeAreaView} from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestExecution'>;
type ScreenRouteProp = RouteProp<TestStackParamList, 'TestExecution'>;

type Question = {
  id: string;
  content: string;
  options: string[];
  correctAnswer?: string;
};

// Mock questions - replace with actual API call
const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    content: 'A bag contains 3 red, 4 blue, and 5 green marbles. Three marbles are drawn without replacement. What is P(all different colors)?',
    options: ['60/220', '80/220', '20/220', '40/220'],
  },
  {
    id: '2',
    content: 'If a = 3 and b = 4, what is a² + b²?',
    options: ['7', '25', '12', '9'],
  },
  // Add more mock questions as needed
];

export const TestExecutionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const {testId, totalQuestions, timeLimit, selectedTopics} = route.params;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    timeLimit ? timeLimit * 60 : null,
  );
  const [testStartTime] = useState(new Date());
  const [questions] = useState<Question[]>(MOCK_QUESTIONS);

  // Timer setup
  useEffect(() => {
    if (timeLimit) {
      const timer = new TestTimer(
        timeLimit,
        timeLeft => setTimeRemaining(timeLeft),
        handleTestComplete,
      );
      timer.start();
      return () => timer.stop();
    }
  }, [timeLimit]);

  // Animate question transitions
  const animateQuestionTransition = (isNext: boolean) => {
    const screenWidth = Dimensions.get('window').width;
    
    slideAnim.setValue(isNext ? 0 : -screenWidth);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

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
      animateQuestionTransition(true);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      animateQuestionTransition(false);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleTestComplete = useCallback(async () => {
    try {
      const endTime = new Date();
      const timeTaken = Math.floor(
        (endTime.getTime() - testStartTime.getTime()) / 1000,
      );

      // Calculate results
      const totalAnswered = Object.keys(answers).length;
      const score = 3; // Mock score - replace with actual calculation
      const accuracy = 30.0; // Mock accuracy - replace with actual calculation

      navigation.replace('TestResults', {
        testId,
        score,
        accuracy,
        timeSpent: Math.floor(timeTaken / 60), // Convert to minutes
        topicPerformance: [
          {
            topicId: '1',
            correct: 3,
            total: 10,
          },
        ],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to submit test. Please try again.', [
        {
          text: 'Retry',
          onPress: handleTestComplete,
        },
      ]);
    }
  }, [navigation, testId, testStartTime, answers]);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isQuestionFlagged = flaggedQuestions.includes(currentQuestion.id);
  const hasAnswer = answers[currentQuestion.id] !== undefined;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Timer and Progress */}
      <View style={styles.header}>
        {timeRemaining !== null && (
          <View style={styles.timerContainer}>
            <Icon
              name="clock-outline"
              type="material-community"
              size={20}
              color="#339af0"
            />
            <Text style={styles.timerText}>
              {Math.floor(timeRemaining / 60)}:
              {(timeRemaining % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        )}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`},
              ]}
            />
          </View>
        </View>
      </View>

      {/* Question Content */}
      <Animated.ScrollView
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{translateX: slideAnim}],
          },
        ]}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionText}>{currentQuestion.content}</Text>
          <TouchableOpacity
            onPress={() => handleFlagQuestion(currentQuestion.id)}
            style={styles.flagButton}>
            <Icon
              name={isQuestionFlagged ? 'flag' : 'flag-outline'}
              type="material-community"
              color={isQuestionFlagged ? '#ff6b6b' : '#868e96'}
              size={24}
            />
          </TouchableOpacity>
        </View>

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
      </Animated.ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, isFirstQuestion && styles.navButtonDisabled]}
            onPress={handlePreviousQuestion}
            disabled={isFirstQuestion}>
            <Icon
              name="chevron-left"
              type="material-community"
              size={24}
              color={isFirstQuestion ? '#adb5bd' : '#339af0'}
            />
            <Text
              style={[
                styles.navButtonText,
                isFirstQuestion && styles.navButtonTextDisabled,
              ]}>
              Previous
            </Text>
          </TouchableOpacity>

          {isLastQuestion ? (
            <TouchableOpacity
              style={[styles.navButton, styles.submitButton]}
              onPress={handleTestComplete}>
              <Text style={styles.submitButtonText}>Submit Test</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navButton, hasAnswer && styles.navButtonEnabled]}
              onPress={handleNextQuestion}>
              <Text
                style={[
                  styles.navButtonText,
                  hasAnswer && styles.navButtonTextEnabled,
                ]}>
                Next
              </Text>
              <Icon
                name="chevron-right"
                type="material-community"
                size={24}
                color={hasAnswer ? '#339af0' : '#adb5bd'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#339af0',
  },
  progressContainer: {
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#868e96',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#339af0',
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  questionText: {
    flex: 1,
    fontSize: 18,
    color: '#212529',
    lineHeight: 28,
  },
  flagButton: {
    padding: 8,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    borderColor: '#339af0',
    backgroundColor: '#e7f5ff',
  },
  optionText: {
    fontSize: 16,
    color: '#495057',
  },
  optionTextSelected: {
    color: '#339af0',
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navButtonEnabled: {
    backgroundColor: '#e7f5ff',
    borderRadius: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#868e96',
  },
  navButtonTextEnabled: {
    color: '#339af0',
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#adb5bd',
  },
  submitButton: {
    backgroundColor: '#339af0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
