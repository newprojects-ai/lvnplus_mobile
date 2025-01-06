import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TestType } from '../types/test';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  ConfigureTest: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Tests: undefined;
  Profile: undefined;
};

export type TestStackParamList = {
  TestSelection: undefined;
  ConfigureTest: {
    testType: TestType;
  };
  TestExecution: {
    testId: string;
    totalQuestions: number;
    timeLimit?: number;
  };
  TestCompletion: {
    testId: string;
    score: number;
    timeTaken: number;
  };
  TestResults: {
    testId: string;
  };
  PracticeSimilar: {
    testId: string;
    topicIds: string[];
  };
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;