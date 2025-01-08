import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '@rneui/themed';

export const TestResultsScreen = () => {
  const navigation = useNavigation();

  // Mock data - replace with actual test results
  const results = {
    accuracy: 30,
    questionsAttempted: 3,
    totalQuestions: 10,
    timeSpent: '1 min',
    topics: [
      {
        name: 'Algebra',
        correct: 2,
        total: 6,
        progress: 33,
      },
      {
        name: 'Data Handling',
        correct: 1,
        total: 4,
        progress: 25,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#4338CA']}
        style={styles.headerGradient}>
        <Text style={styles.title}>Test Complete!</Text>
        <Text style={styles.subtitle}>Here's how you performed</Text>

        <View style={styles.statsCard}>
          <View style={styles.accuracyContainer}>
            <View style={styles.accuracyCircle}>
              <Text style={styles.accuracyText}>{results.accuracy}%</Text>
              <Text style={styles.accuracyLabel}>Accuracy</Text>
            </View>
          </View>

          <View style={styles.statsInfo}>
            <Text style={styles.statsLabel}>Questions Attempted</Text>
            <Text style={styles.statsValue}>
              {results.questionsAttempted}/{results.totalQuestions}
            </Text>
            <Text style={styles.statsLabel}>Time Spent</Text>
            <Text style={styles.statsValue}>{results.timeSpent}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Topic Performance</Text>
        {results.topics.map((topic, index) => (
          <View key={index} style={styles.topicCard}>
            <View style={styles.topicIcon}>
              <Icon
                name={topic.name === 'Algebra' ? 'function' : 'chart-bar'}
                type="material-community"
                color="#6366F1"
                size={24}
              />
            </View>
            <View style={styles.topicContent}>
              <Text style={styles.topicName}>{topic.name}</Text>
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { width: `${topic.progress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.topicStats}>
                {topic.correct} correct of {topic.total} questions
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.practiceButton]}
          onPress={() => navigation.navigate('TestConfiguration')}>
          <Text style={styles.practiceButtonText}>Practice More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.reviewButton]}
          onPress={() => navigation.navigate('TestReview', { results })}>
          <Text style={styles.reviewButtonText}>Review Test</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accuracyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    paddingRight: 16,
  },
  accuracyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accuracyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  accuracyLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsInfo: {
    flex: 1,
    paddingLeft: 16,
  },
  statsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: -24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  topicStats: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  reviewButton: {
    backgroundColor: '#6366F1',
  },
  practiceButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TestResultsScreen;
