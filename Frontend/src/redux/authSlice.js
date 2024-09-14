import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Adjust the path to where you placed the api.js file

// Define initial state
const initialState = {
  user: null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to handle user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/login', { email, password });
      return response.data; // Assuming the response contains user info and token
    } catch (error) {
      console.error('Login error:', error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to handle user logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/logout'); // Adjust the endpoint if needed
      return; // No additional data needed for logout
    } catch (error) {
      console.error('Logout error:', error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
      });
  },
});

// Selector for checking if the user is authenticated
export const selectIsAuthenticated = (state) => !!state.auth.token;

// Export actions and reducer
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
