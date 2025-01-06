import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type {Topic, TestPlan, TestSession, Question, RootState, TestStatistics, QuestionTiming, TopicPerformance} from '../../types/test';
import {testService} from '../../services/test';

interface TestState {
  topics: Topic[];
  currentSession: TestSession | null;
  currentQuestionIndex: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestState = {
  topics: [],
  currentSession: null,
  currentQuestionIndex: null,
  loading: false,
  error: null,
};

export const fetchTopics = createAsyncThunk(
  'test/fetchTopics',
  async (_, {rejectWithValue}) => {
    try {
      return await testService.getTopics();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch topics');
    }
  },
);

export const createTestPlan = createAsyncThunk(
  'test/createPlan',
  async (plan: Partial<TestPlan>, {rejectWithValue}) => {
    try {
      return await testService.createTestPlan(plan);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create test plan');
    }
  },
);

export const startTestSession = createAsyncThunk(
  'test/startSession',
  async (testConfig: TestPlan, {rejectWithValue}) => {
    try {
      // TODO: Replace with actual API call
      const mockQuestions: Question[] = [
        {
          id: '1',
          content: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '4',
        },
        // Add more mock questions
      ];

      const session: TestSession = {
        id: Date.now().toString(),
        questions: mockQuestions,
        answers: {},
        flaggedQuestions: [],
        startTime: new Date().toISOString(),
        timeLimit: testConfig.timeLimit,
        status: 'in_progress',
      };

      return session;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to start test session');
    }
  },
);

export const submitAnswer = createAsyncThunk(
  'test/submitAnswer',
  async ({questionId, answer}: {questionId: string; answer: string}, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const {currentSession} = state.test;

      if (!currentSession) {
        throw new Error('No active test session');
      }

      // TODO: Add API call to save answer
      return {questionId, answer};
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to submit answer');
    }
  },
);

export const startPracticeSession = createAsyncThunk(
  'test/startPracticeSession',
  async (params: {testId: string; topicIds: string[]}, {dispatch}) => {
    try {
      // Create a new practice session based on previous test
      const response = await testService.createPracticeSession(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const completeTest = createAsyncThunk(
  'test/completeTest',
  async (
    params: {
      testId: string;
      answers: Record<string, string>;
      endTime: string;
    },
    {dispatch},
  ) => {
    try {
      // Submit test answers and get results
      const response = await testService.submitTest(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchTestResults = createAsyncThunk(
  'test/fetchTestResults',
  async (testId: string) => {
    try {
      // Get detailed test results including statistics
      const response = await testService.getTestResults(testId);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

const calculateTestStatistics = (session: TestSession): TestStatistics => {
  const totalQuestions = session.questions.length;
  const questionsAttempted = Object.keys(session.answers).length;
  const skippedQuestions = totalQuestions - questionsAttempted;

  let correctAnswers = 0;
  let incorrectAnswers = 0;

  // Calculate basic statistics
  session.questions.forEach(question => {
    const userAnswer = session.answers[question.id];
    if (userAnswer) {
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    }
  });

  const accuracy = questionsAttempted > 0 
    ? (correctAnswers / questionsAttempted) * 100 
    : 0;

  // Calculate time statistics
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime || new Date().toISOString());
  const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

  // Mock timing data (replace with actual timing tracking)
  const questionTiming: QuestionTiming[] = session.questions.map(q => ({
    questionId: q.id,
    timeSpent: Math.floor(Math.random() * 45) + 5, // Random time between 5-50 seconds
  }));

  const timeStats = questionTiming.reduce(
    (acc, curr) => {
      if (curr.timeSpent < acc.quickest) acc.quickest = curr.timeSpent;
      if (curr.timeSpent > acc.slowest) acc.slowest = curr.timeSpent;
      acc.total += curr.timeSpent;
      return acc;
    },
    {quickest: Infinity, slowest: 0, total: 0},
  );

  // Mock topic performance (replace with actual topic mapping)
  const topicPerformance: TopicPerformance[] = [
    {
      topicId: '1',
      name: 'Algebra',
      correct: Math.floor(Math.random() * 5),
      total: 5,
      questions: session.questions.slice(0, 5).map(q => q.id),
    },
    {
      topicId: '2',
      name: 'Geometry',
      correct: Math.floor(Math.random() * 5),
      total: 5,
      questions: session.questions.slice(5, 10).map(q => q.id),
    },
  ];

  return {
    totalQuestions,
    questionsAttempted,
    correctAnswers,
    incorrectAnswers,
    skippedQuestions,
    accuracy,
    timeTaken,
    topicPerformance,
    questionTiming,
    quickestAnswer: timeStats.quickest,
    slowestAnswer: timeStats.slowest,
    averageTime: Math.round(timeStats.total / questionsAttempted),
  };
};

export const completeTestSession = createAsyncThunk(
  'test/completeSession',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const {currentSession} = state.test;

      if (!currentSession) {
        throw new Error('No active test session');
      }

      const completedSession: TestSession = {
        ...currentSession,
        endTime: new Date().toISOString(),
        status: 'completed',
      };

      // Calculate statistics
      completedSession.statistics = calculateTestStatistics(completedSession);

      // TODO: Add API call to save completed session
      return completedSession;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to complete test session');
    }
  },
);

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    updateAnswer: (
      state,
      action: PayloadAction<{questionId: string; answer: string; timeSpent: number}>,
    ) => {
      if (state.currentSession) {
        state.currentSession.answers[action.payload.questionId] = action.payload.answer;
        if (!state.currentSession.questionTiming) {
          state.currentSession.questionTiming = {};
        }
        state.currentSession.questionTiming[action.payload.questionId] = action.payload.timeSpent;
      }
    },
    flagQuestion: (state, action: PayloadAction<string>) => {
      if (state.currentSession) {
        if (!state.currentSession.flaggedQuestions) {
          state.currentSession.flaggedQuestions = [];
        }
        if (!state.currentSession.flaggedQuestions.includes(action.payload)) {
          state.currentSession.flaggedQuestions.push(action.payload);
        }
      }
    },
    unflagQuestion: (state, action: PayloadAction<string>) => {
      if (state.currentSession?.flaggedQuestions) {
        state.currentSession.flaggedQuestions = state.currentSession.flaggedQuestions.filter(
          id => id !== action.payload,
        );
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTopics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topics = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTestPlan.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(startTestSession.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startTestSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(startTestSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        if (state.currentSession) {
          state.currentSession.answers[action.payload.questionId] = action.payload.answer;
        }
      })
      .addCase(completeTestSession.fulfilled, (state, action) => {
        state.currentSession = action.payload;
      })
      .addCase(startPracticeSession.pending, state => {
        state.loading = true;
      })
      .addCase(startPracticeSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
        state.currentQuestionIndex = 0;
      })
      .addCase(startPracticeSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(completeTest.pending, state => {
        state.loading = true;
      })
      .addCase(completeTest.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSession) {
          state.currentSession.endTime = new Date().toISOString();
          state.currentSession.statistics = action.payload.statistics;
        }
      })
      .addCase(completeTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTestResults.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTestResults.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSession) {
          state.currentSession.statistics = action.payload.statistics;
        }
      })
      .addCase(fetchTestResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {resetError, setCurrentQuestion, updateAnswer, flagQuestion, unflagQuestion} = testSlice.actions;
export default testSlice.reducer;