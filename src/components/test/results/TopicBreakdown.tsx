import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TopicPerformance = {
  topicId: string;
  name: string;
  correct: number;
  total: number;
};

type TopicBreakdownProps = {
  topics: TopicPerformance[];
};

export const TopicBreakdown: React.FC<TopicBreakdownProps> = ({topics}) => {
  const getPerformanceColor = (percentage: number): string => {
    if (percentage >= 80) return '#37b24d';
    if (percentage >= 60) return '#1c7ed6';
    if (percentage >= 40) return '#f59f00';
    return '#e03131';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance by Topic</Text>
      {topics.map(topic => {
        const percentage = (topic.correct / topic.total) * 100;
        return (
          <View key={topic.topicId} style={styles.topicContainer}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicName}>{topic.name}</Text>
              <Text style={styles.score}>
                {topic.correct}/{topic.total}
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${percentage}%`,
                    backgroundColor: getPerformanceColor(percentage),
                  },
                ]}
              />
              <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  topicContainer: {
    marginBottom: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
  },
  score: {
    fontSize: 14,
    color: '#868e96',
    marginLeft: 8,
  },
  progressContainer: {
    height: 24,
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    borderRadius: 12,
  },
  percentage: {
    position: 'absolute',
    right: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
  },
});
