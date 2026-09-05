import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  name: string;
  email: string;
  picture?: string | null;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Async Thunk: Authenticate with Google Credential token (Sets HttpOnly Cookie via Backend Express Server)
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (credential: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include HttpOnly cookies across origins
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.error || 'Google authentication failed');
      }

      return data.user as UserProfile;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error during Google login');
    }
  }
);

// Async Thunk: Request Email OTP Verification Code
export const requestEmailOtp = createAsyncThunk(
  'auth/requestEmailOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.error || 'Failed to send verification code.');
      }

      return data.message as string;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error while requesting verification code.');
    }
  }
);

// Async Thunk: Verify Email OTP & Login (Sets HttpOnly Cookie via Backend Express Server)
export const verifyEmailOtp = createAsyncThunk(
  'auth/verifyEmailOtp',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.error || 'Invalid or expired verification code.');
      }

      return data.user as UserProfile;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error while verifying OTP.');
    }
  }
);

// Async Thunk: Re-hydrate user session on app launch from HttpOnly Cookie (Backend Express Server)
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: 'include',
      });
      const data = await res.json();

      if (data.isAuthenticated && data.user) {
        return data.user as UserProfile;
      }
      return null;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch session');
    }
  }
);

// Async Thunk: Logout User (Clears HttpOnly Cookie via Backend Express Server)
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      return null;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // loginWithGoogle
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // verifyEmailOtp
    builder
      .addCase(verifyEmailOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailOtp.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // fetchCurrentUser
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserProfile | null>) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    // logoutUser
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
