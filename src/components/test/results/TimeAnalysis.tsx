import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TimeAnalysisProps = {
  totalTime: number; // in seconds
  averageTime: number; // in seconds
  quickestAnswer: number; // in seconds
  slowestAnswer: number; // in seconds
};

export const TimeAnalysis: React.FC<TimeAnalysisProps> = ({
  totalTime,
  averageTime,
  quickestAnswer,
  slowestAnswer,
}) => {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time Analysis</Text>
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Total Time</Text>
          <Text style={styles.value}>{formatTime(totalTime)}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Average Time</Text>
          <Text style={styles.value}>{formatTime(averageTime)}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Quickest</Text>
          <Text style={styles.value}>{formatTime(quickestAnswer)}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Slowest</Text>
          <Text style={styles.value}>{formatTime(slowestAnswer)}</Text>
        </View>
      </View>
      <View style={styles.timeDistribution}>
        <Text style={styles.distributionTitle}>Time Distribution</Text>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.timeBar,
              {
                width: `${(quickestAnswer / slowestAnswer) * 100}%`,
                backgroundColor: '#37b24d',
              },
            ]}
          />
          <View
            style={[
              styles.timeBar,
              {
                width: `${(averageTime / slowestAnswer) * 100}%`,
                backgroundColor: '#1c7ed6',
              },
            ]}
          />
          <View
            style={[
              styles.timeBar,
              {
                width: '100%',
                backgroundColor: '#e03131',
              },
            ]}
          />
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#37b24d'}]} />
            <Text style={styles.legendText}>Quickest</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#1c7ed6'}]} />
            <Text style={styles.legendText}>Average</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#e03131'}]} />
            <Text style={styles.legendText}>Slowest</Text>
          </View>
        </View>
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  gridItem: {
    width: '50%',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  timeDistribution: {
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    paddingTop: 16,
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 12,
  },
  barContainer: {
    height: 24,
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  timeBar: {
    position: 'absolute',
    height: '100%',
    borderRadius: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#495057',
  },
});
