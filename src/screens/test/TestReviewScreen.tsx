import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export const TestReviewScreen = () => {
  const navigation = useNavigation();
  
  // Mock data - replace with actual test data
  const summary = {
    correct: 3,
    incorrect: 7,
  };

  const questions = [
    {
      id: 1,
      title: 'Question 1',
      topic: 'Probability - Drawing Marbles',
      userAnswer: '60/220',
      correctAnswer: '120/220',
      isCorrect: false,
    },
    {
      id: 2,
      title: 'Question 2',
      topic: 'Bar Charts - Data Analysis',
      userAnswer: 'Correct',
      correctAnswer: 'Correct',
      isCorrect: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#4338CA']}
        style={styles.headerGradient}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="white" size={24} />
          <Text style={styles.backText}>Results</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Question Review</Text>
      </LinearGradient>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryBox, styles.correctBox]}>
            <Text style={styles.summaryNumber}>{summary.correct}</Text>
          </View>
          <Text style={styles.summaryLabel}>Correct</Text>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryBox, styles.incorrectBox]}>
            <Text style={styles.summaryNumber}>{summary.incorrect}</Text>
          </View>
          <Text style={styles.summaryLabel}>Incorrect</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {questions.map((question) => (
          <View
            key={question.id}
            style={[
              styles.questionCard,
              question.isCorrect ? styles.correctCard : styles.incorrectCard,
            ]}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionTitle}>{question.title}</Text>
              <Icon
                name={question.isCorrect ? 'check-circle' : 'close-circle'}
                type="material-community"
                color={question.isCorrect ? '#059669' : '#DC2626'}
                size={24}
              />
            </View>
            <Text style={styles.topicText}>{question.topic}</Text>
            <View style={styles.answerContainer}>
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Your Answer:</Text>
                <Text
                  style={[
                    styles.answerText,
                    question.isCorrect ? styles.correctAnswer : styles.incorrectAnswer,
                  ]}>
                  {question.userAnswer}
                </Text>
              </View>
              {!question.isCorrect && (
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Correct Answer:</Text>
                  <Text style={[styles.answerText, styles.correctAnswer]}>
                    {question.correctAnswer}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  correctBox: {
    backgroundColor: '#D1FAE5',
  },
  incorrectBox: {
    backgroundColor: '#FEE2E2',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  correctCard: {
    borderLeftColor: '#059669',
  },
  incorrectCard: {
    borderLeftColor: '#DC2626',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  topicText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  answerContainer: {
    gap: 8,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  correctAnswer: {
    color: '#059669',
  },
  incorrectAnswer: {
    color: '#DC2626',
  },
});

export default TestReviewScreen;
