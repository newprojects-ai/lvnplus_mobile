import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AuthState, LoginData, RegisterData, AuthResponse} from '../../types/auth';
import {authService} from '../../services/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, {rejectWithValue}) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, {rejectWithValue}) => {
    try {
      return await authService.register(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
  return await authService.checkAuth();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;
      });

    // Check Auth
    builder
      .addCase(checkAuth.pending, state => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
        state.loading = false;
      })
      .addCase(checkAuth.rejected, state => {
        state.loading = false;
      });
  },
});

export const {resetError} = authSlice.actions;
export default authSlice.reducer;