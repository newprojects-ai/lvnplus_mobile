import { api } from './api';
import { storage } from './storage';
import type { LoginData, RegisterData, AuthResponse } from '../types/auth';

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(data),
    });
    const authResponse = await handleResponse<AuthResponse>(response);
    await this.handleAuthResponse(authResponse);
    return authResponse;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(data),
    });
    const authResponse = await handleResponse<AuthResponse>(response);
    await this.handleAuthResponse(authResponse);
    return authResponse;
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: api.headers,
    });
    await handleResponse<void>(response);
    await storage.clearAuth();
    api.setAuthToken(null);
  },

  async handleAuthResponse(authResponse: AuthResponse): Promise<void> {
    await Promise.all([
      storage.setAuthToken(authResponse.token),
      storage.setUserData(JSON.stringify(authResponse.user)),
    ]);
    api.setAuthToken(authResponse.token);
  },

  async checkAuth(): Promise<AuthResponse | null> {
    try {
      const [token, userData] = await Promise.all([
        storage.getAuthToken(),
        storage.getUserData(),
      ]);

      if (!token || !userData) {
        return null;
      }

      const user = JSON.parse(userData);
      api.setAuthToken(token);
      return { token, user };
    } catch (error) {
      console.error('Error checking auth:', error);
      return null;
    }
  },
};