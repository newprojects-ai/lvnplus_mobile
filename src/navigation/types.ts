import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TestType } from '../types/test';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type SubjectType = 'MATHS' | 'SCIENCE' | 'ENGLISH';

export type TestStackParamList = {
  SubjectSelection: undefined;
  TestTypeSelection: {
    subjectId: string;
  };
  TopicSelection: {
    subjectId: string;
    testType: 'TOPIC' | 'MIXED' | 'MENTAL';
  };
  TestConfiguration: {
    subjectId: string;
    testType: 'TOPIC' | 'MIXED' | 'MENTAL';
    selectedTopics?: string[];
  };
  TestQuestionScreen: {
    numQuestions: number;
    isTimed?: boolean;
    timeLimit?: number;
  };
  TestResults: {
    results: {
      totalQuestions: number;
      questionsAttempted: number;
      unansweredQuestions: number;
      flaggedQuestions: number;
      correctAnswers: number;
      incorrectAnswers: number;
      timeSpent: string;
      topics: Array<{
        name: string;
        correct: number;
        total: number;
      }>;
    };
  };
  TestReview: {
    results: {
      totalQuestions: number;
      questionsAttempted: number;
      unansweredQuestions: number;
      flaggedQuestions: number;
      correctAnswers: number;
      incorrectAnswers: number;
      timeSpent: string;
      topics: Array<{
        name: string;
        correct: number;
        total: number;
      }>;
    };
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