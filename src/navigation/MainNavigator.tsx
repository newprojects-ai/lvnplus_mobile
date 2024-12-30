import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {ConfigureTestScreen} from '../screens/test/ConfigureTestScreen';
import {MainStackParamList} from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ConfigureTest"
        component={ConfigureTestScreen}
        options={{title: 'Configure Test'}}
      />
    </Stack.Navigator>
  );
};