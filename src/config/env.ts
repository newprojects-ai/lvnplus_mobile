import { Platform } from 'react-native';

// Use 10.0.2.2 for Android emulator to access host's localhost
const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api';
  }
  return 'http://localhost:3000/api';
};

export const API_BASE_URL = getApiUrl();

export const ENV = {
  API_BASE_URL,
  // Add other environment variables here
} as const;
