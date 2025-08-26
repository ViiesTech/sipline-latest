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
  myLocations: [],
  currentLocation: {},
  locationAdded: false,
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
    clearLocation: (state, action) => {
      state.myLocations = [];
      state.currentLocation = {};
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
    setMyLocation: (state, action) => {
      const existingIndex = state.myLocations.findIndex(
        loc => loc.category === action.payload.category,
      );
      if (existingIndex !== -1) {
        state.myLocations[existingIndex] = action.payload;
      } else {
        state.myLocations.push(action.payload);
      }
    },
    setLocationAdded: (state, action) => {
      state.locationAdded = !state?.locationAdded;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setTokenAndData: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      // state.profileCreated = action.payload.profileCreated;
    },
    setClearProducts: (state, action) => {
      state.cartProducts = [];
      state.adminId = '';
    },
    clearProductById: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        item => item._id !== action.payload,
      );
    },
    setProfileCreated: (state, action) => {
      console.log('action.payload',action.payload);
      state.profileCreated = action.payload;
    },
    setAdminId: (state, action) => {
      state.adminId = action.payload;
    },
    clearAdminId: (state, action) => {
      state.adminId = '';
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
        state.currentLocation = {location: action?.payload?.data?.location};
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
  setLocationAdded,
  setTokenAndData,
  setProfileCreated,
  setLoading,
  setClearProducts,
  setAdminId,
  setCartProducts,
  clearProductById,
  clearLocation,
  setMyLocation,
  setCurrentLocation,
  clearAdminId,
} = authSlice.actions;
export default authSlice.reducer;
