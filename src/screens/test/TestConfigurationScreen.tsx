import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export const TestConfigurationScreen = () => {
  const navigation = useNavigation();
  const [numQuestions, setNumQuestions] = useState(5);
  const [isTimedMode, setIsTimedMode] = useState(true);

  const questionOptions = [5, 10, 15, 20, 25];

  const handleStartTest = () => {
    navigation.navigate('TestQuestionScreen', {
      numQuestions,
      isTimedMode,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#4338CA']}
        style={styles.headerGradient}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="white" size={24} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Configuration</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Questions</Text>
          <View style={styles.questionOptions}>
            {questionOptions.map((count) => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.questionOption,
                  numQuestions === count && styles.selectedQuestionOption,
                ]}
                activeOpacity={0.7}
                onPress={() => setNumQuestions(count)}>
                <Text
                  style={[
                    styles.questionOptionText,
                    numQuestions === count && styles.selectedQuestionOptionText,
                  ]}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.recommendationText}>
            Recommended: 10-20 questions
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Mode</Text>
          
          <TouchableOpacity
            style={[styles.modeCard, isTimedMode && styles.selectedModeCard]}
            onPress={() => setIsTimedMode(true)}>
            <View style={styles.modeIconContainer}>
              <Icon
                name="timer"
                type="material"
                color={isTimedMode ? '#6366F1' : '#9CA3AF'}
                size={24}
              />
            </View>
            <View style={styles.modeContent}>
              <Text style={[styles.modeTitle, isTimedMode && styles.selectedText]}>
                Timed Mode
              </Text>
              <Text style={styles.modeDetail}>• 45 seconds per question</Text>
              <Text style={styles.modeDetail}>• Progress tracking</Text>
              <Text style={styles.modeDetail}>• Performance analytics</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, !isTimedMode && styles.selectedModeCard]}
            onPress={() => setIsTimedMode(false)}>
            <View style={styles.modeIconContainer}>
              <Icon
                name="book"
                type="material"
                color={!isTimedMode ? '#6366F1' : '#9CA3AF'}
                size={24}
              />
            </View>
            <View style={styles.modeContent}>
              <Text style={[styles.modeTitle, !isTimedMode && styles.selectedText]}>
                Un-timed Mode
              </Text>
              <Text style={styles.modeDetail}>• No time pressure</Text>
              <Text style={styles.modeDetail}>• Detailed explanations</Text>
              <Text style={styles.modeDetail}>• Focus on learning</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartTest}>
          <Text style={styles.startButtonText}>Start Test</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  questionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  questionOption: {
    minWidth: 56,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  selectedQuestionOption: {
    backgroundColor: '#6366F1',
  },
  questionOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedQuestionOptionText: {
    color: 'white',
  },
  recommendationText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  modeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedModeCard: {
    backgroundColor: '#F5F3FF',
    borderColor: '#6366F1',
    borderWidth: 2,
  },
  modeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modeContent: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  selectedText: {
    color: '#6366F1',
  },
  modeDetail: {
    color: '#6B7280',
    marginBottom: 4,
  },
  startButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TestConfigurationScreen;
