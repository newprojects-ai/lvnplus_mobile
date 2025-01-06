import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from '@rneui/themed';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {TestNavigator} from './TestNavigator';
import {ProgressScreen} from '../screens/progress/ProgressScreen';
import {GoalsScreen} from '../screens/goals/GoalsScreen';
import {HelpScreen} from '../screens/help/HelpScreen';
import {MainTabParamList, MainStackParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{title: 'Progress'}}
      />
      <Stack.Screen
        name="Goals"
        component={GoalsScreen}
        options={{title: 'Goals'}}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{title: 'Help & Support'}}
      />
    </Stack.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#339af0',
        tabBarInactiveTintColor: '#868e96',
        tabBarStyle: {
          borderTopColor: '#e9ecef',
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="home" type="material-community" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tests"
        component={TestNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="book-open-variant" type="material-community" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account" type="material-community" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};