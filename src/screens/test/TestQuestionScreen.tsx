import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { TestStackParamList } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '@rneui/themed';

type ScreenRouteProp = RouteProp<TestStackParamList, 'TestQuestionScreen'>;

export const TestQuestionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const { numQuestions = 10 } = route.params; // Default to 10 if not provided

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);

  // Track question states
  const [questionStats, setQuestionStats] = useState({
    answered: 0,
    unanswered: numQuestions,
    flagged: 0,
  });

  // Update stats whenever answers or flags change
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    setQuestionStats({
      answered: answeredCount,
      unanswered: numQuestions - answeredCount,
      flagged: flaggedQuestions.length,
    });
  }, [answers, flaggedQuestions, numQuestions]);

  const handleNext = () => {
    if (currentQuestion < numQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev =>
      prev.includes(currentQuestion)
        ? prev.filter(q => q !== currentQuestion)
        : [...prev, currentQuestion],
    );
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleFinishTest = () => {
    // Calculate results
    const results = {
      totalQuestions: numQuestions,
      questionsAttempted: questionStats.answered,
      unansweredQuestions: questionStats.unanswered,
      flaggedQuestions: questionStats.flagged,
      correctAnswers: 3, // Replace with actual calculation
      incorrectAnswers: 7, // Replace with actual calculation
      timeSpent: '1 min', // Replace with actual time tracking
      topics: [
        {
          name: 'Algebra',
          correct: 2,
          total: 6,
        },
        {
          name: 'Data Handling',
          correct: 1,
          total: 4,
        },
      ],
    };

    navigation.navigate('TestResults', { results });
  };

  const question = {
    text: 'A bag contains 3 red, 4 blue, and 5 green marbles. Three marbles are drawn without replacement. What is P(all different colors)?',
    options: [
      { id: 1, value: '60/220' },
      { id: 2, value: '55/220' },
      { id: 3, value: '30/220' },
      { id: 4, value: '80/220' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#4338CA']}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.timerContainer}>
            <Icon name="timer-outline" type="material-community" color="white" size={20} />
            <Text style={styles.timerText}>12:30</Text>
          </View>
          <Text style={styles.questionCount}>
            Question {currentQuestion}/{numQuestions}
          </Text>
        </View>

        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{numQuestions}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Answered</Text>
            <Text style={styles.statValue}>{questionStats.answered}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Unanswered</Text>
            <Text style={styles.statValue}>{questionStats.unanswered}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Flagged</Text>
            <Text style={styles.statValue}>{questionStats.flagged}</Text>
          </View>
        </View>

        {/* Question Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.questionNav}
          contentContainerStyle={styles.questionNavContent}>
          {Array.from({ length: numQuestions }, (_, i) => {
            const questionNum = i + 1;
            const isAnswered = answers[questionNum] !== undefined;
            const isFlagged = flaggedQuestions.includes(questionNum);
            const isActive = currentQuestion === questionNum;

            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.questionNavButton,
                  isActive && styles.activeNavButton,
                  isAnswered && styles.answeredNavButton,
                  isFlagged && styles.flaggedNavButton,
                ]}
                onPress={() => setCurrentQuestion(questionNum)}>
                <Text
                  style={[
                    styles.questionNavText,
                    isActive && styles.activeNavText,
                    isAnswered && styles.answeredNavText,
                  ]}>
                  {questionNum}
                </Text>
                {isFlagged && (
                  <Icon
                    name="flag"
                    type="material-community"
                    color="#DC2626"
                    size={12}
                    style={styles.flagIcon}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionText}>
              {question.text}
            </Text>
            <TouchableOpacity
              style={styles.flagButton}
              onPress={toggleFlag}>
              <Icon
                name={flaggedQuestions.includes(currentQuestion) ? 'flag' : 'flag-outline'}
                type="material-community"
                color={flaggedQuestions.includes(currentQuestion) ? '#DC2626' : '#6B7280'}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answers[currentQuestion] === option.value && styles.selectedOption,
                ]}
                onPress={() => handleAnswer(option.value)}>
                <Text
                  style={[
                    styles.optionText,
                    answers[currentQuestion] === option.value && styles.selectedOptionText,
                  ]}>
                  {option.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={handlePrevious}
          disabled={currentQuestion === 1}>
          <Icon
            name="chevron-left"
            type="material-community"
            color={currentQuestion === 1 ? '#9CA3AF' : '#6366F1'}
            size={24}
          />
          <Text
            style={[
              styles.navButtonText,
              {color: currentQuestion === 1 ? '#9CA3AF' : '#6366F1'},
            ]}>
            Previous
          </Text>
        </TouchableOpacity>

        {currentQuestion === numQuestions ? (
          <TouchableOpacity
            style={[styles.navButton, styles.finishButton]}
            onPress={handleFinishTest}>
            <Text style={styles.finishButtonText}>Finish</Text>
            <Icon
              name="check-circle"
              type="material-community"
              color="#FFFFFF"
              size={24}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon
              name="chevron-right"
              type="material-community"
              color="#FFFFFF"
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  questionCount: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  questionContainer: {
    padding: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  flagButton: {
    padding: 8,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: '#F5F3FF',
    borderColor: '#6366F1',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  selectedOptionText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  prevButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  nextButton: {
    backgroundColor: '#6366F1',
  },
  finishButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  questionNav: {
    marginBottom: -1,
  },
  questionNavContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  questionNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeNavButton: {
    backgroundColor: '#6366F1',
  },
  answeredNavButton: {
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  flaggedNavButton: {
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  questionNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeNavText: {
    color: 'white',
  },
  answeredNavText: {
    color: '#6366F1',
  },
  flagIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});
