import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestReview'>;
type ScreenRouteProp = RouteProp<TestStackParamList, 'TestReview'>;

// Mock data - replace with API call
const MOCK_TOPICS = {
  '1.1': 'Natural Numbers',
  '1.2': 'Whole Numbers',
  '1.3': 'Integers',
  '2.1': 'Linear Equations',
  '2.2': 'Quadratic Equations',
  '2.3': 'Polynomials',
};

export const TestReviewScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const {
    subject,
    testType,
    selectedTopics,
    numberOfQuestions,
    isTimed,
    timeLimit,
  } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  // Format time for display
  const formatTime = (minutes?: number) => {
    if (!minutes) return 'No time limit';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  const handleStartTest = async () => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual test creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.navigate('TestExecution', {
        testId: 'test-123', // Replace with actual test ID from API
        totalQuestions: numberOfQuestions,
        timeLimit: isTimed ? timeLimit : undefined,
        selectedTopics,
      });
    } catch (error) {
      // Handle error
      console.error('Failed to create test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Review your test settings</Text>

        {/* Test Configuration Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Configuration</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="format-list-numbered"
                  type="material-community"
                  size={24}
                  color="#339af0"
                />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.label}>Questions</Text>
                <Text style={styles.value}>{numberOfQuestions} questions</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="clock-outline"
                  type="material-community"
                  size={24}
                  color="#339af0"
                />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.label}>Time Limit</Text>
                <Text style={styles.value}>
                  {isTimed ? formatTime(timeLimit) : 'Untimed'}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="book-open-variant"
                  type="material-community"
                  size={24}
                  color="#339af0"
                />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.label}>Test Type</Text>
                <Text style={styles.value}>
                  {testType === 'TOPIC'
                    ? 'Topic Wise'
                    : testType === 'MIXED'
                    ? 'Mixed'
                    : 'Mental Arithmetic'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Selected Topics */}
        {testType === 'TOPIC' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Topics</Text>
            <View style={styles.card}>
              {selectedTopics.map(topicId => (
                <View key={topicId} style={styles.topicRow}>
                  <Icon
                    name="check-circle"
                    type="material-community"
                    size={20}
                    color="#40c057"
                  />
                  <Text style={styles.topicName}>
                    {MOCK_TOPICS[topicId as keyof typeof MOCK_TOPICS]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.card}>
            <View style={styles.instructionRow}>
              <Icon
                name="information"
                type="material-community"
                size={20}
                color="#339af0"
              />
              <Text style={styles.instruction}>
                You can flag questions to review them later
              </Text>
            </View>
            {isTimed && (
              <View style={styles.instructionRow}>
                <Icon
                  name="timer-outline"
                  type="material-community"
                  size={20}
                  color="#339af0"
                />
                <Text style={styles.instruction}>
                  The test will auto-submit when time expires
                </Text>
              </View>
            )}
            <View style={styles.instructionRow}>
              <Icon
                name="gesture-tap"
                type="material-community"
                size={20}
                color="#339af0"
              />
              <Text style={styles.instruction}>
                Tap an option to select your answer
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartTest}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.startButtonText}>Start Test</Text>
              <Icon name="play" type="material-community" color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#868e96',
    marginVertical: 16,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7f5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  topicName: {
    fontSize: 16,
    color: '#495057',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  instruction: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  startButton: {
    backgroundColor: '#339af0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
