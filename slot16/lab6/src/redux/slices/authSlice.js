import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Tạo thunk xử lý đăng nhập bất đồng bộ
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
      const user = users.find(
        (u) => u.username === credentials.username && u.password === credentials.password
      );
      if (user) {
        const { password, ...safeUser } = user; // Bảo mật: loại bỏ password trước khi lưu
        return safeUser; 
      } else {
        return rejectWithValue('Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      return rejectWithValue('Không thể kết nối đến máy chủ');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;