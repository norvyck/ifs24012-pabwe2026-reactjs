import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';
import { putAccessToken, getAccessToken } from '../../../helpers/apiHelper';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const isAuthLogin = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      putAccessToken(response.data.token);
      return response.data.token;
    } catch (error) {
      showErrorDialog(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const isAuthRegister = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      showSuccessDialog('Registrasi berhasil! Silakan login.');
      return response.data;
    } catch (error) {
      showErrorDialog(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getAccessToken() || null,
    loading: false,
    error: null,
  },
  reducers: {
    isAuthLogout: (state) => {
      state.token = null;
      putAccessToken('');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isAuthLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isAuthLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(isAuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { isAuthLogout } = authSlice.actions;
export default authSlice.reducer;
