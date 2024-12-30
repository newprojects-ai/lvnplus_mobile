import {api, handleResponse} from './api';
import type {TestPlan, Topic} from '../types/test';
import {API_BASE_URL} from '../config/env';

export const testService = {
  async getTopics(): Promise<Topic[]> {
    const response = await fetch(`${API_BASE_URL}/topics`, {
      headers: api.headers,
    });
    return handleResponse<Topic[]>(response);
  },

  async createTestPlan(plan: Partial<TestPlan>): Promise<TestPlan> {
    const response = await fetch(`${API_BASE_URL}/tests/plans`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(plan),
    });
    return handleResponse<TestPlan>(response);
  },

  async saveTemplate(plan: Partial<TestPlan>): Promise<TestPlan> {
    const response = await fetch(`${API_BASE_URL}/tests/templates`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(plan),
    });
    return handleResponse<TestPlan>(response);
  },
};