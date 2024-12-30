export type Role = 'student' | 'teacher' | 'parent' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
  role: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  parentId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}