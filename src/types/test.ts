export type TestType = 'TOPIC' | 'MIXED' | 'MENTAL_ARITHMETIC';
export type TimingType = 'TIMED' | 'UNTIMED';

export interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  name: string;
  topicId: string;
}

export interface TestPlan {
  testPlanId?: number;
  templateId?: number | null;
  boardId: number;
  testType: TestType;
  timingType: TimingType;
  timeLimit?: number;
  studentId: number;
  plannedBy: number;
  plannedAt?: string;
  configuration: {
    topics: number[];
    subtopics: number[];
    totalQuestionCount: number;
  };
}

export interface TestConfigStep {
  key: string;
  title: string;
  completed: boolean;
}

export const TIME_LIMITS = [5, 10, 15, 30, 45, 60] as const;
export type TimeLimit = typeof TIME_LIMITS[number];

export type Question = {
  id: string;
  content: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
};

export type TopicPerformance = {
  topicId: string;
  name: string;
  correct: number;
  total: number;
  questions: string[]; // Question IDs
};

export type QuestionTiming = {
  questionId: string;
  timeSpent: number; // in seconds
};

export type TestStatistics = {
  totalQuestions: number;
  questionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  accuracy: number;
  timeTaken: number;
  topicPerformance: TopicPerformance[];
  questionTiming: QuestionTiming[];
  quickestAnswer: number;
  slowestAnswer: number;
  averageTime: number;
};

export type TestSession = {
  id: string;
  questions: Question[];
  answers: Record<string, string>;
  flaggedQuestions: string[];
  startTime: string;
  endTime?: string;
  timeLimit?: number;
  status: 'in_progress' | 'completed' | 'expired';
  statistics?: TestStatistics;
};