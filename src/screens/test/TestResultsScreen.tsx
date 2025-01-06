import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '../../hooks';
import {PerformanceChart} from '../../components/test/results/PerformanceChart';
import {TopicBreakdown} from '../../components/test/results/TopicBreakdown';
import {QuestionReview} from '../../components/test/results/QuestionReview';
import {TimeAnalysis} from '../../components/test/results/TimeAnalysis';
import {Button} from '../../components/ui/Button';

export const TestResultsScreen = () => {
  const {currentSession} = useAppSelector(state => state.test);

  if (!currentSession || !currentSession.statistics) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#339af0" />
        <Text style={styles.loadingText}>Loading results...</Text>
      </View>
    );
  }

  const {statistics} = currentSession;

  // Calculate topic-wise performance
  const topicPerformance = [
    {
      topicId: '1',
      name: 'Algebra',
      correct: 4,
      total: 5,
    },
    {
      topicId: '2',
      name: 'Geometry',
      correct: 3,
      total: 5,
    },
    // Add more topics
  ];

  // Calculate time analysis
  const timeAnalysis = {
    totalTime: statistics.timeTaken,
    averageTime: Math.round(statistics.timeTaken / statistics.questionsAttempted),
    quickestAnswer: 5, // Mock data
    slowestAnswer: 45, // Mock data
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Performance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <PerformanceChart
            accuracy={statistics.accuracy}
            attempted={statistics.questionsAttempted}
            total={statistics.totalQuestions}
          />
        </View>

        {/* Time Analysis */}
        <View style={styles.section}>
          <TimeAnalysis {...timeAnalysis} />
        </View>

        {/* Topic Breakdown */}
        <View style={styles.section}>
          <TopicBreakdown topics={topicPerformance} />
        </View>

        {/* Question Review */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Question Review</Text>
          {currentSession.questions.map(question => (
            <QuestionReview
              key={question.id}
              question={{
                ...question,
                userAnswer: currentSession.answers[question.id],
              }}
            />
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title="Practice Similar Questions"
            onPress={() => {
              // TODO: Navigate to practice screen
            }}
            style={styles.actionButton}
          />
          <Button
            title="Return to Home"
            variant="secondary"
            onPress={() => {
              // TODO: Navigate to home
            }}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  actionsContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
});
