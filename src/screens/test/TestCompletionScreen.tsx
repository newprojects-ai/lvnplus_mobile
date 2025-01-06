import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {Button} from '../../components/ui/Button';
import {Icon} from '@rneui/themed';
import {useAppSelector} from '../../hooks';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestCompletion'>;
type RoutePropType = RouteProp<TestStackParamList, 'TestCompletion'>;

export const TestCompletionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const {testId, score, timeTaken} = route.params;
  const {currentSession} = useAppSelector(state => state.test);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 90) return 'Outstanding!';
    if (score >= 80) return 'Excellent!';
    if (score >= 70) return 'Good job!';
    if (score >= 60) return 'Well done!';
    return 'Keep practicing!';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#37b24d';
    if (score >= 80) return '#339af0';
    if (score >= 70) return '#f59f00';
    if (score >= 60) return '#fd7e14';
    return '#868e96';
  };

  const handleViewResults = () => {
    navigation.replace('TestResults', {
      testId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, {backgroundColor: getScoreColor(score)}]}>
          <Icon
            name="check-circle"
            type="material-community"
            color="#fff"
            size={64}
          />
        </View>
        
        <Text style={styles.title}>Test Complete!</Text>
        <Text style={styles.message}>{getScoreMessage(score)}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{score}%</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatTime(timeTaken)}</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="View Results"
            onPress={handleViewResults}
            style={styles.button}
          />
          <Button
            title="Practice Similar Questions"
            onPress={() => {
              navigation.replace('PracticeSimilar', {
                testId,
                topicIds: currentSession?.topicIds || [],
              });
            }}
            variant="secondary"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#37b24d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  message: {
    fontSize: 20,
    color: '#495057',
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#dee2e6',
    marginHorizontal: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#868e96',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 12,
  },
});
