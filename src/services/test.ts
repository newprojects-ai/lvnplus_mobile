import axios from 'axios';
import {API_BASE_URL} from '../config/env';
import type {Topic, TestPlan, TestSession, TestStatistics} from '../types/test';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(testService.handleError(error));
  },
);

export const testService = {
  getTopics: async () => {
    const response = await api.get<{data: Topic[]}>('/topics');
    return response.data.data;
  },

  createTestPlan: async (plan: TestPlan) => {
    const response = await api.post<{data: TestSession}>('/tests/plan', plan);
    return response.data.data;
  },

  startTestSession: async (plan: TestPlan) => {
    const response = await api.post<{data: TestSession}>('/tests/sessions', plan);
    return response.data.data;
  },

  createPracticeSession: async (params: {testId: string; topicIds: string[]}) => {
    const response = await api.post<{data: TestSession}>('/tests/practice', params);
    return response.data.data;
  },

  submitTest: async (params: {
    testId: string;
    answers: Record<string, string>;
    endTime: string;
  }) => {
    const response = await api.post<{data: {statistics: TestStatistics}}>(
      `/tests/${params.testId}/submit`,
      params,
    );
    return response.data.data;
  },

  getTestResults: async (testId: string) => {
    const response = await api.get<{data: {statistics: TestStatistics}}>(
      `/tests/${testId}/results`,
    );
    return response.data.data;
  },

  // Helper function to handle API errors
  handleError: (error: any): Error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message =
        error.response.data?.message || error.response.data?.error || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error('Error setting up request. Please try again.');
    }
  },
};