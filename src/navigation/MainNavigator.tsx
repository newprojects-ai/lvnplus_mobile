import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {TestNavigator} from './TestNavigator';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

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
        component={HomeScreen}
        options={{
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