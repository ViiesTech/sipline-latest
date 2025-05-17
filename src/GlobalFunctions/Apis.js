import axios from 'axios';
import {baseUrl, endPoints, imageUrl, userBaseUrl} from '../utils/Api_contents';
import {ShowToast} from './ShowToast';
import {
  setLoading,
  setProfileCreated,
  setTokenAndData,
  setUserData,
  UserLogin,
} from '../reduxNew/Slices';

export const RegisterUser = async (
  email,
  phone,
  password,
  navigation,
  dispatch,
) => {
  try {
    dispatch(setLoading(true));
    let data = JSON.stringify({
      email: email,
      phone: phone,
      password: password,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}${endPoints.signUp}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios.request(config);
    dispatch(setLoading(false));

    console.log('response.data', response.data);
    const resData = response.data;
    if (response.data.success) {
      ShowToast('success', response.data.msg);
      navigation.navigate('OTP', {
        email: resData.data.email,
        token: resData.accessToken,
        type: 'register',
      });
    } else {
      return ShowToast('error', response.data.msg);
    }
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};
export const VerifyUser = async (email, otp, token, navigation, dispatch) => {
  try {
    dispatch(setLoading(true));
    let data = JSON.stringify({
      email: email,
      OTP: otp,
      signupToken: token,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}${endPoints.otpVerification}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios.request(config);
    dispatch(setLoading(false));
    console.log('response.data', response.data);
    if (response.data.success) {
      ShowToast('success', response.data.msg);
      console.log('responsess', response.data.data.profileCreted);
      dispatch(
        setTokenAndData({
          token: response.data.accessToken,
          userData: response.data.data,
          profileCreated: response.data.data.profileCreted,
        }),
      );
      navigation.navigate('SetProfilePic', {userId: response.data.data.id});
    } else {
      return ShowToast('error', response.data.msg);
    }
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};

export const VerifyOtpPassword = async (email, otp, dispatch, navigation) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    email: email,
    OTP: otp,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.otpVerificationPass}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('resssponse.data', response.data);
    dispatch(setLoading(false));
    if (response.data.success) {
      ShowToast('success', response.data.msg);
      console.log(response.data.data.id);
      console.log(response.data.data.email);
      navigation.navigate('ResetPassword', {
        userId: response.data.data.id,
        email: response.data.data.email,
      });
    } else {
      ShowToast('error', response.data.msg);
      return;
    }
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};
export const LoginUser = async (email, password, dispatch) => {
  let data = JSON.stringify({
    email: email,
    password: password,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.signIn}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  dispatch(UserLogin(config));
};

export const ForgotPass = async (email, dispatch, navigation) => {
  dispatch(setLoading(true));

  let data = JSON.stringify({
    email: email,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.forgetPassword}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('response', response.data);
    if (response.data.success) {
      ShowToast('success', response.data.msg);
      navigation.navigate('OTP', {
        email: response.data.data.email,
        type: 'forgotPass',
      });
    } else {
      ShowToast('error', response.data.msg);
    }
    dispatch(setLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);

    throw error;
  }
};

export const ResetPasswordUser = async (
  userId,
  password,
  navigation,
  dispatch,
) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    userId: userId,
    password: password,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.resetPassword}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    dispatch(setLoading(false));
    if (response.data.success) {
      ShowToast('success', response.data.msg);
      navigation.navigate('Login');
    } else {
      ShowToast('error', response.data.msg);
      return;
    }
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};

export const getAllCoupons = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.discountCoupon}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const CreateProfile = async params => {
  const {
    userId,
    name,
    dob,
    gender,
    long,
    lat,
    locName,
    userImage,
    bio,
    postalCode,
    dispatch,
    navigation,
  } = params;
  dispatch(setLoading(true));
  let data = new FormData();
  if (userId) {
    data.append('userId', userId);
  }
  if (name) {
    data.append('fullName', name);
  }
  if (dob) {
    data.append('DOB', dob);
  }
  if (gender) {
    data.append('gender', gender);
  }
  if (long) {
    data.append('longitude', long);
  }
  if (lat) {
    data.append('latitude', lat);
  }
  if (locName) {
    data.append('locationName', locName);
  }
  if (userImage) {
    data.append('userImage', {
      uri: userImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  }
  if (bio) {
    data.append('bio', bio);
  }
  if (postalCode) {
    data.append('postalCode', postalCode);
  }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.profileCreate}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    dispatch(setLoading(false));
    dispatch(setProfileCreated(true));
    dispatch(setUserData(response.data.data));
    ShowToast('success', response.data.msg);
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.msg);
    console.log('error', error.response.data.msg);
    dispatch(setLoading(false));
    throw error;
  }
};
export const getAllShops = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.allShops}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const nearbyShops = async (lat, lng, dispatch) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${userBaseUrl}nearbyShops?longitude=${lng}&latitude=${lat}`,
    headers: {},
  };
  try {
    dispatch(setLoading(true));
    console.log('hii');
    const response = await axios.request(config);
    dispatch(setLoading(false));
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));

    throw error;
  }
};
export const addContactSupport = async (
  id,
  name,
  email,
  phone,
  msg,
  dispatch,
) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    userId: id,
    name: name,
    email: email,
    phone: phone,
    message: msg,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.support}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('ressponse.data========<<<<<<<<<>>>>>>>>>', response);
    dispatch(setLoading(false));
    if (response.data.success) {
      ShowToast('success', response.data.msg);
    } else {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.msg);
    dispatch(setLoading(false));
    throw error;
  }
};
export const getAdminProducts = async adminId => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${userBaseUrl}getAllProducts?adminId=${adminId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderHistory = async (userId, status, dispatch) => {
  dispatch(setLoading(true));
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.orderHistory}?userId=${userId}&status=${status}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    dispatch(setLoading(false));
    if (response.data.success) {
      ShowToast('success', response.data.msg);
    } else {
      ShowToast('error', response.data.msg);
    }
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.msg);
    dispatch(setLoading(false));
    throw error;
  }
};

export const applyCouponCode = async (couponCode, dispatch) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    couponCode: couponCode,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.applyCouponCode}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    dispatch(setLoading(false));
    if (response.data.success) {
      ShowToast('success', 'Coupon Applied');
    } else {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.msg);
    dispatch(setLoading(false));
    throw error;
  }
};
