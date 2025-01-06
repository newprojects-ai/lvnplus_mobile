import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import {PerformanceChart} from '../../components/test/results/PerformanceChart';
import {TopicBreakdown} from '../../components/test/results/TopicBreakdown';
import {QuestionReview} from '../../components/test/results/QuestionReview';
import {TimeAnalysis} from '../../components/test/results/TimeAnalysis';
import {Button} from '../../components/ui/Button';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchTestResults} from '../../store/slices/testSlice';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestResults'>;
type ScreenRouteProp = RouteProp<TestStackParamList, 'TestResults'>;

export const TestResultsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const dispatch = useAppDispatch();
  const {currentSession, loading, error} = useAppSelector(state => state.test);

  useEffect(() => {
    if (route.params?.testId) {
      dispatch(fetchTestResults(route.params.testId));
    }
  }, [dispatch, route.params?.testId]);

  const handleShare = async () => {
    try {
      const message = `I just completed a test on LVNPlus!\n\nScore: ${currentSession?.statistics.score}%\nAccuracy: ${currentSession?.statistics.accuracy}%\nTime: ${currentSession?.statistics.timeTaken} minutes\n\nDownload LVNPlus to practice tests!`;
      await Share.share({
        message,
        title: 'My Test Results',
      });
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };

  const handlePracticeSimilar = () => {
    // Navigate to practice screen with similar questions
    navigation.replace('TestTypeSelection', {
      subjectId: route.params.subjectId,
      topics: currentSession?.topicPerformance
        .filter(topic => topic.accuracy < 70)
        .map(topic => topic.topicId),
    });
  };

  const handleReturnHome = () => {
    navigation.navigate('SubjectSelection');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#339af0" />
        <Text style={styles.loadingText}>Loading your results...</Text>
      </View>
    );
  }

  if (error || !currentSession?.statistics) {
    return (
      <View style={styles.errorContainer}>
        <Icon
          name="alert-circle-outline"
          type="material-community"
          size={48}
          color="#fa5252"
        />
        <Text style={styles.errorText}>Failed to load results</Text>
        <Button
          title="Try Again"
          onPress={() => dispatch(fetchTestResults(route.params.testId))}
          style={styles.retryButton}
        />
      </View>
    );
  }

  const {statistics, topicPerformance} = currentSession;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Test Results</Text>
        <TouchableOpacity 
          onPress={handleShare} 
          style={styles.shareButton}
          activeOpacity={0.7}>
          <Icon
            name="share-variant"
            type="material-community"
            size={24}
            color="#339af0"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Score Card */}
        <View style={styles.scoreCardContainer}>
          <View style={styles.scoreCard}>
            <View style={styles.scoreItem}>
              <View style={[styles.scoreIconContainer, { backgroundColor: '#e7f5ff' }]}>
                <Icon
                  name="star"
                  type="material-community"
                  size={24}
                  color="#339af0"
                />
              </View>
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scoreValue}>{statistics.score}%</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <View style={[styles.scoreIconContainer, { backgroundColor: '#fff3bf' }]}>
                <Icon
                  name="clock-outline"
                  type="material-community"
                  size={24}
                  color="#fab005"
                />
              </View>
              <Text style={styles.scoreLabel}>Time</Text>
              <Text style={styles.scoreValue}>{statistics.timeTaken}m</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <View style={[styles.scoreIconContainer, { backgroundColor: '#d3f9d8' }]}>
                <Icon
                  name="check-circle-outline"
                  type="material-community"
                  size={24}
                  color="#40c057"
                />
              </View>
              <Text style={styles.scoreLabel}>Accuracy</Text>
              <Text style={styles.scoreValue}>{statistics.accuracy}%</Text>
            </View>
          </View>
        </View>

        {/* Performance Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon
              name="chart-arc"
              type="material-community"
              size={24}
              color="#339af0"
            />
            <Text style={styles.sectionTitle}>Performance Overview</Text>
          </View>
          <PerformanceChart
            accuracy={statistics.accuracy}
            attempted={statistics.questionsAttempted}
            total={statistics.totalQuestions}
          />
        </View>

        {/* Time Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon
              name="clock-outline"
              type="material-community"
              size={24}
              color="#339af0"
            />
            <Text style={styles.sectionTitle}>Time Analysis</Text>
          </View>
          <TimeAnalysis
            totalTime={statistics.timeTaken}
            averageTime={Math.round(statistics.timeTaken / statistics.questionsAttempted)}
            quickestAnswer={statistics.quickestAnswer}
            slowestAnswer={statistics.slowestAnswer}
          />
        </View>

        {/* Topic Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon
              name="book-open-variant"
              type="material-community"
              size={24}
              color="#339af0"
            />
            <Text style={styles.sectionTitle}>Topic Performance</Text>
          </View>
          <TopicBreakdown topics={topicPerformance} />
        </View>

        {/* Question Review */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon
              name="format-list-checks"
              type="material-community"
              size={24}
              color="#339af0"
            />
            <Text style={styles.sectionTitle}>Question Review</Text>
          </View>
          <View style={styles.questionList}>
            {currentSession.questions.map((question, index) => (
              <QuestionReview
                key={question.id}
                question={{
                  ...question,
                  userAnswer: currentSession.answers[question.id],
                }}
                index={index + 1}
              />
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={handlePracticeSimilar}
            style={styles.primaryButton}
            activeOpacity={0.8}>
            <Icon
              name="refresh"
              type="material-community"
              size={24}
              color="#fff"
            />
            <Text style={styles.primaryButtonText}>Practice Similar Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReturnHome}
            style={styles.secondaryButton}
            activeOpacity={0.8}>
            <Icon
              name="home"
              type="material-community"
              size={24}
              color="#339af0"
            />
            <Text style={styles.secondaryButtonText}>Return to Home</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: -0.5,
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#e7f5ff',
    borderRadius: 8,
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
    color: '#868e96',
    letterSpacing: -0.3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 18,
    color: '#495057',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  retryButton: {
    minWidth: 120,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  scoreCardContainer: {
    padding: 16,
    margin: -16,
    marginBottom: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  scoreIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreDivider: {
    width: 1,
    backgroundColor: '#e9ecef',
    marginHorizontal: 16,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#868e96',
    letterSpacing: -0.2,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: -0.5,
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    letterSpacing: -0.4,
  },
  questionList: {
    gap: 16,
  },
  actionsContainer: {
    marginTop: 32,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#339af0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#1971c2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.3,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#e7f5ff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#339af0',
    letterSpacing: -0.3,
  },
});
