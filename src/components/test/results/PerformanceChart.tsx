import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';

type PerformanceChartProps = {
  accuracy: number;
  attempted: number;
  total: number;
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  accuracy,
  attempted,
  total,
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: accuracy / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [accuracy]);

  const getGrade = (accuracy: number): string => {
    if (accuracy >= 90) return 'A';
    if (accuracy >= 80) return 'B';
    if (accuracy >= 70) return 'C';
    if (accuracy >= 60) return 'D';
    return 'F';
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 90) return '#37b24d';
    if (accuracy >= 70) return '#1c7ed6';
    if (accuracy >= 50) return '#f59f00';
    return '#e03131';
  };

  const size = Dimensions.get('window').width * 0.5;
  const borderWidth = 12;

  const interpolatedRotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View
          style={[
            styles.progressBackground,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.progressForeground,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth,
              borderColor: getAccuracyColor(accuracy),
              transform: [{rotate: interpolatedRotate}],
            },
          ]}
        />
        <View style={[styles.gradeContainer, {width: size, height: size}]}>
          <Text style={styles.grade}>{getGrade(accuracy)}</Text>
          <Text style={styles.accuracyText}>{Math.round(accuracy)}%</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{attempted}</Text>
          <Text style={styles.statLabel}>Questions Attempted</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{total}</Text>
          <Text style={styles.statLabel}>Total Questions</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBackground: {
    borderColor: '#e9ecef',
    position: 'absolute',
  },
  progressForeground: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
  gradeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grade: {
    fontSize: 48,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  accuracyText: {
    fontSize: 16,
    color: '#495057',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#868e96',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#dee2e6',
  },
});
