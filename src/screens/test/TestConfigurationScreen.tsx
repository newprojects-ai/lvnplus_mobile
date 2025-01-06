import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {TimingType, TIME_LIMITS} from '../../types/test';
import {Icon} from '@rneui/themed';
import Slider from '@react-native-community/slider';

type NavigationProp = NativeStackNavigationProp<
  TestStackParamList,
  'TestConfiguration'
>;
type ScreenRouteProp = RouteProp<TestStackParamList, 'TestConfiguration'>;

const QUESTION_COUNTS = [5, 10, 15, 20, 25, 30];

export const TestConfigurationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const {subject, testType, selectedTopics} = route.params;

  // Configuration states
  const [questionCount, setQuestionCount] = useState(10);
  const [timingType, setTimingType] = useState<TimingType>('UNTIMED');
  const [timeLimit, setTimeLimit] = useState(TIME_LIMITS[1]); // Default 10 minutes

  // Format time for display
  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  // Calculate estimated completion time
  const estimatedTime = useMemo(() => {
    if (timingType === 'TIMED') {
      return timeLimit;
    }
    // Estimate 1 minute per question for untimed
    return questionCount;
  }, [timingType, timeLimit, questionCount]);

  const handleContinue = () => {
    navigation.navigate('TestReview', {
      subject,
      testType,
      selectedTopics,
      numberOfQuestions: questionCount,
      isTimed: timingType === 'TIMED',
      timeLimit: timingType === 'TIMED' ? timeLimit : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Configure your test settings</Text>

        {/* Number of Questions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Questions</Text>
          <View style={styles.questionCountContainer}>
            {QUESTION_COUNTS.map(count => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.countButton,
                  questionCount === count && styles.countButtonSelected,
                ]}
                onPress={() => setQuestionCount(count)}>
                <Text
                  style={[
                    styles.countButtonText,
                    questionCount === count && styles.countButtonTextSelected,
                  ]}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timing</Text>
          <View style={styles.timingContainer}>
            <TouchableOpacity
              style={[
                styles.timingOption,
                timingType === 'UNTIMED' && styles.timingOptionSelected,
              ]}
              onPress={() => setTimingType('UNTIMED')}>
              <Icon
                name={
                  timingType === 'UNTIMED'
                    ? 'checkbox-marked-circle'
                    : 'checkbox-blank-circle-outline'
                }
                type="material-community"
                size={24}
                color={timingType === 'UNTIMED' ? '#339af0' : '#868e96'}
              />
              <View style={styles.timingTextContainer}>
                <Text style={styles.timingTitle}>Untimed</Text>
                <Text style={styles.timingDescription}>
                  Take your time to solve each question
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.timingOption,
                timingType === 'TIMED' && styles.timingOptionSelected,
              ]}
              onPress={() => setTimingType('TIMED')}>
              <Icon
                name={
                  timingType === 'TIMED'
                    ? 'checkbox-marked-circle'
                    : 'checkbox-blank-circle-outline'
                }
                type="material-community"
                size={24}
                color={timingType === 'TIMED' ? '#339af0' : '#868e96'}
              />
              <View style={styles.timingTextContainer}>
                <Text style={styles.timingTitle}>Timed</Text>
                <Text style={styles.timingDescription}>
                  Challenge yourself with a time limit
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Time Limit Slider */}
          {timingType === 'TIMED' && (
            <View style={styles.timeLimitContainer}>
              <Text style={styles.timeLimitLabel}>Time Limit:</Text>
              <Text style={styles.timeLimitValue}>{formatTime(timeLimit)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={TIME_LIMITS.length - 1}
                step={1}
                value={TIME_LIMITS.indexOf(timeLimit)}
                onValueChange={value => setTimeLimit(TIME_LIMITS[value])}
                minimumTrackTintColor="#339af0"
                maximumTrackTintColor="#e9ecef"
                thumbTintColor="#339af0"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>5m</Text>
                <Text style={styles.sliderLabel}>1h</Text>
              </View>
            </View>
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Questions:</Text>
              <Text style={styles.summaryValue}>{questionCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Time:</Text>
              <Text style={styles.summaryValue}>{formatTime(estimatedTime)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Topics:</Text>
              <Text style={styles.summaryValue}>{selectedTopics.length}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Review Test</Text>
          <Icon name="arrow-right" type="material-community" color="#fff" />
        </Pressable>
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
  questionCountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  countButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: '#fff',
    minWidth: 60,
    alignItems: 'center',
  },
  countButtonSelected: {
    backgroundColor: '#339af0',
    borderColor: '#339af0',
  },
  countButtonText: {
    fontSize: 16,
    color: '#495057',
  },
  countButtonTextSelected: {
    color: '#fff',
  },
  timingContainer: {
    gap: 12,
  },
  timingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    gap: 12,
  },
  timingOptionSelected: {
    borderColor: '#339af0',
    backgroundColor: '#f8f9fa',
  },
  timingTextContainer: {
    flex: 1,
  },
  timingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  timingDescription: {
    fontSize: 14,
    color: '#868e96',
  },
  timeLimitContainer: {
    marginTop: 16,
  },
  timeLimitLabel: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  timeLimitValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#868e96',
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#495057',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#339af0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
