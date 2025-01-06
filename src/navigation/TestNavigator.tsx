import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestSelectionScreen} from '../screens/test/TestSelectionScreen';
import {ConfigureTestScreen} from '../screens/test/ConfigureTestScreen';
import {TestExecutionScreen} from '../screens/test/TestExecutionScreen';
import {TestCompletionScreen} from '../screens/test/TestCompletionScreen';
import {TestResultsScreen} from '../screens/test/TestResultsScreen';
import {TestStackParamList} from './types';

const Stack = createNativeStackNavigator<TestStackParamList>();

export const TestNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TestSelection"
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="TestSelection"
        component={TestSelectionScreen}
        options={{
          title: 'Tests',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="ConfigureTest"
        component={ConfigureTestScreen}
        options={{title: 'Configure Test'}}
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
        name="TestCompletion"
        component={TestCompletionScreen}
        options={{
          title: 'Test Complete',
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="TestResults"
        component={TestResultsScreen}
        options={{
          title: 'Test Results',
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
