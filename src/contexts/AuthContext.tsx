import React, {createContext, useContext, useEffect, useState} from 'react';
import {AuthState, AuthResponse, LoginData, RegisterData} from '../types/auth';
import {authService} from '../services/auth';
import {getErrorMessage} from '../utils/error';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authData = await authService.checkAuth();
      if (authData) {
        updateAuthState(authData);
      }
    } catch (error) {
      setState(prev => ({...prev, error: 'Authentication failed'}));
    } finally {
      setState(prev => ({...prev, loading: false}));
    }
  };

  const updateAuthState = (data: AuthResponse) => {
    setState({
      user: data.user,
      token: data.token,
      loading: false,
      error: null,
    });
  };

  const login = async (data: LoginData) => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));
      const response = await authService.login(data);
      updateAuthState(response);
    } catch (error) {
      const message = getErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: message,
      }));
      throw error;
    } finally {
      setState(prev => ({...prev, loading: false}));
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));
      const response = await authService.register(data);
      updateAuthState(response);
    } catch (error) {
      const message = getErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: message,
      }));
      throw error;
    } finally {
      setState(prev => ({...prev, loading: false}));
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));
      await authService.logout();
      setState({...initialState, loading: false});
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Logout failed',
        loading: false,
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};