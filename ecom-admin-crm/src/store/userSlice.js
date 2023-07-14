
// Import the createSlice and createAsyncThunk functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import axios to make HTTP requests
import axios from 'axios';

// Define the base URL for our API
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Action creator for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  }
);

// Action creator for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    const data = response.data;
    // todo: use JWT from .env
    localStorage.setItem('jwt', data.user.token);
    return data;
  }
);

// Create a slice of state to manage the authentication data
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
