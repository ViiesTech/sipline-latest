import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ShowToast} from '../GlobalFunctions/ShowToast';

// Initial State
const initialState = {
  userData: {},
  token: '',
  adminId: '',
  profileCreated: false,
  cartProducts: [],
  isLoading: false,
  error: null,
};

// Async Thunk
export const UserLogin = createAsyncThunk(
  'auth/UserLogin',
  async (config, {rejectWithValue}) => {
    try {
      const response = await axios.request(config);
      console.log('response.data', response.data);
      if (response.data.success) {
        ShowToast('success', response.data.msg);
        return response.data;
      } else {
        ShowToast('error', response.data.msg);
        return rejectWithValue('Login failed');
      }
    } catch (error) {
      ShowToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
      return rejectWithValue('Something went wrong');
    }
  },
);

// Redux Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: state => {
      state.token = '';
      state.userData = {};
      state.profileCreated = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },

    setTokenAndData: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      state.profileCreated = action.payload.profileCreated;
    },
    setClearProducts: (state, action) => {
      state.cartProducts = [];
      state.adminId = '';
    },
    setProfileCreated: (state, action) => {
      state.profileCreated = action.payload;
    },
    setAdminId: (state, action) => {
      state.adminId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(UserLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.userData = action.payload.data;
        state.profileCreated = action.payload.data.profileCreted;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearToken,
  setUserData,
  setToken,
  setTokenAndData,
  setProfileCreated,
  setLoading,
  setClearProducts,
  setAdminId,
  setCartProducts,
} = authSlice.actions;
export default authSlice.reducer;
