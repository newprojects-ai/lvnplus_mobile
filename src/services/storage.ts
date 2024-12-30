import EncryptedStorage from 'react-native-encrypted-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
} as const;

export const storage = {
  async setAuthToken(token: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error storing auth token:', error);
      throw error;
    }
  },

  async getAuthToken(): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error retrieving auth token:', error);
      return null;
    }
  },

  async setUserData(userData: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(STORAGE_KEYS.USER_DATA, userData);
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  },

  async getUserData(): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  },

  async clearAuth(): Promise<void> {
    try {
      await Promise.all([
        EncryptedStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        EncryptedStorage.removeItem(STORAGE_KEYS.USER_DATA),
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  },
};