import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestStackParamList} from './types';
import {SubjectSelectionScreen} from '../screens/test/SubjectSelectionScreen';
import {TestTypeSelectionScreen} from '../screens/test/TestTypeSelectionScreen';
import {TopicSelectionScreen} from '../screens/test/TopicSelectionScreen';
import {TestConfigurationScreen} from '../screens/test/TestConfigurationScreen';
import {TestReviewScreen} from '../screens/test/TestReviewScreen';
import {TestExecutionScreen} from '../screens/test/TestExecutionScreen';
import {TestResultsScreen} from '../screens/test/TestResultsScreen';

const Stack = createNativeStackNavigator<TestStackParamList>();

export const TestNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SubjectSelection"
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="SubjectSelection"
        component={SubjectSelectionScreen}
        options={{
          title: 'Practice Tests',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="TestTypeSelection"
        component={TestTypeSelectionScreen}
        options={{
          title: 'Select Test Type',
        }}
      />
      <Stack.Screen
        name="TopicSelection"
        component={TopicSelectionScreen}
        options={{
          title: 'Select Topics',
        }}
      />
      <Stack.Screen
        name="TestConfiguration"
        component={TestConfigurationScreen}
        options={{
          title: 'Configure Test',
        }}
      />
      <Stack.Screen
        name="TestReview"
        component={TestReviewScreen}
        options={{
          title: 'Review Settings',
        }}
      />
      <Stack.Screen
        name="TestExecution"
        component={TestExecutionScreen}
        options={{
          title: 'Test in Progress',
          headerLeft: () => null, // Prevent going back during test
          gestureEnabled: false, // Disable swipe back
        }}
      />
      <Stack.Screen
        name="TestResults"
        component={TestResultsScreen}
        options={{
          title: 'Test Results',
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
