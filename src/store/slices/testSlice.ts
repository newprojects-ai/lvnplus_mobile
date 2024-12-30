import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {Topic, TestPlan} from '../../types/test';
import {testService} from '../../services/test';

interface TestState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

const initialState: TestState = {
  topics: [],
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

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
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
      });
  },
});

export const {resetError} = testSlice.actions;
export default testSlice.reducer;