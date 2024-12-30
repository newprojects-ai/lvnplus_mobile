import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {TestType, TimingType, TimeLimit, Topic} from '../../types/test';

interface ReviewStepProps {
  config: {
    testType: TestType;
    timingType: TimingType;
    timeLimit?: TimeLimit;
    selectedTopics: string[];
    selectedSubtopics: string[];
    questionCount: number;
  };
  topics: Topic[];
}

export const ReviewStep: React.FC<ReviewStepProps> = ({config, topics}) => {
  const getTestTypeLabel = (type: TestType): string => {
    switch (type) {
      case 'TOPIC':
        return 'Subject Specific';
      case 'MIXED':
        return 'Multi Subject';
      case 'MENTAL_ARITHMETIC':
        return 'Mental Arithmetic';
    }
  };

  const getSelectedTopicsInfo = () => {
    return topics
      .filter(topic => config.selectedTopics.includes(topic.id))
      .map(topic => ({
        name: topic.name,
        subtopics: topic.subtopics
          .filter(sub => config.selectedSubtopics.includes(sub.id))
          .map(sub => sub.name),
      }));
  };

  const selectedTopicsInfo = getSelectedTopicsInfo();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Type</Text>
        <Text style={styles.value}>{getTestTypeLabel(config.testType)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timing</Text>
        <Text style={styles.value}>
          {config.timingType === 'TIMED'
            ? `${config.timeLimit} minutes`
            : 'Untimed'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Topics</Text>
        {selectedTopicsInfo.map((topic, index) => (
          <View key={index} style={styles.topicInfo}>
            <Text style={styles.topicName}>{topic.name}</Text>
            {topic.subtopics.map((sub, subIndex) => (
              <Text key={subIndex} style={styles.subtopicName}>
                • {sub}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Questions</Text>
        <Text style={styles.value}>{config.questionCount} questions</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  topicInfo: {
    marginBottom: 12,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  subtopicName: {
    fontSize: 14,
    color: '#666',
    marginLeft: 16,
    marginBottom: 2,
  },
});