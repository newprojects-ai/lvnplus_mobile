import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TestType } from '../types/test';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type SubjectType = 'MATHS' | 'SCIENCE' | 'ENGLISH';

export type TestStackParamList = {
  SubjectSelection: undefined;
  TestTypeSelection: {
    subject: SubjectType;
  };
  TopicSelection: {
    subject: SubjectType;
    testType: TestType;
  };
  TestConfiguration: {
    subject: SubjectType;
    testType: TestType;
    selectedTopics: string[];
  };
  TestReview: {
    subject: SubjectType;
    testType: TestType;
    selectedTopics: string[];
    numberOfQuestions: number;
    isTimed: boolean;
  };
  TestExecution: {
    testId: string;
    totalQuestions: number;
    timeLimit?: number;
    selectedTopics: string[];
  };
  TestResults: {
    testId: string;
    score: number;
    accuracy: number;
    timeSpent: number;
    topicPerformance: {
      topicId: string;
      correct: number;
      total: number;
    }[];
  };
};

export type MainStackParamList = {
  HomeTab: undefined;
  Progress: undefined;
  Goals: undefined;
  Help: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Tests: NavigatorScreenParams<TestStackParamList>;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};