import axios from 'axios';
import {baseUrl, endPoints} from '../utils/Api_contents';
import {ShowToast} from './ShowToast';
import {setLoading, UserLogin} from '../reduxNew/Slices';

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
      navigation.navigate('Login');
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
