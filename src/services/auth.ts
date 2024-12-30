import { api, handleResponse } from './api';
import { storage } from './storage';
import type { LoginData, RegisterData, AuthResponse } from '../types/auth';
import { API_BASE_URL } from '../config/env';

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('Registering with:', API_BASE_URL, data);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify(data),
      });
      console.log('Register response status:', response.status);
      const authResponse = await handleResponse<AuthResponse>(response);
      await this.handleAuthResponse(authResponse);
      return authResponse;
    } catch (error) {
      console.error('Registration error:', error);
      throw error instanceof Error ? error : new Error('Registration failed');
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('Logging in with:', API_BASE_URL, data);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify(data),
      });
      console.log('Login response status:', response.status);
      const authResponse = await handleResponse<AuthResponse>(response);
      await this.handleAuthResponse(authResponse);
      return authResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      console.log('Logging out');
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: api.headers,
      });
      await handleResponse<void>(response);
      await storage.clearAuth();
      api.setAuthToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error instanceof Error ? error : new Error('Logout failed');
    }
  },

  async handleAuthResponse(authResponse: AuthResponse): Promise<void> {
    try {
      await Promise.all([
        storage.setAuthToken(authResponse.token),
        storage.setUserData(JSON.stringify(authResponse.user)),
      ]);
      api.setAuthToken(authResponse.token);
    } catch (error) {
      console.error('Error handling auth response:', error);
      throw error;
    }
  },

  async checkAuth(): Promise<AuthResponse | null> {
    try {
      const [token, userData] = await Promise.all([
        storage.getAuthToken(),
        storage.getUserData(),
      ]);

      if (!token || !userData) {
        console.log('No stored auth data found');
        return null;
      }

      api.setAuthToken(token);
      return {
        token,
        user: JSON.parse(userData),
      };
    } catch (error) {
      console.error('Auth check failed:', error);
      return null;
    }
  },
};