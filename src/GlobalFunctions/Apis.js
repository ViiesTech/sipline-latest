import axios from 'axios';
import {baseUrl, endPoints, imageUrl, userBaseUrl} from '../utils/Api_contents';
import {ShowToast} from './ShowToast';
import {
  setClearProducts,
  setLoading,
  setProfileCreated,
  setTokenAndData,
  setUserData,
  UserLogin,
} from '../reduxNew/Slices';
import {Buffer} from 'buffer';
import moment from 'moment';

export const RegisterUser = async (
  email,
  phone,
  password,
  dob,
  navigation,
  dispatch,
) => {
  try {
    dispatch(setLoading(true));
    let formattedDOB = moment(dob).format('DD-MM-YYYY');
    let data = JSON.stringify({
      email: email.toLowerCase(),
      phone: phone,
      password: password,
      DOB: formattedDOB,
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
      email: email.toLowerCase(),
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
    // if (response.data.success) {
    //   ShowToast('success', response.data.msg);
    //   console.log('responsess', response.data.data.profileCreted);
    //   navigation.navigate('OnboardingStack', {userId: response.data.data._id});
    //   dispatch(
    //     setTokenAndData({
    //       token: response.data.accessToken,
    //       userData: response.data.data,
    //       // profileCreated: response.data.data.profileCreted,
    //     }),
    //   );
    //   // navigation.navigate('SetProfilePic', {userId: response.data.data.id});
    // }
    if (response.data.success) {
      ShowToast('success', response.data.msg);

      // ✅ first set redux state
      dispatch(
        setTokenAndData({
          token: response.data.accessToken,
          userData: response.data.data,
        }),
      );

      // ✅ update profileCreated based on API response
      dispatch(setProfileCreated(response.data.data.profileCreted));

      // now OnboardingStack will exist in navigator tree
      navigation.navigate('OnBoardingStack', {
        screen: 'SetProfilePic',
        params: {
          userId: response.data.data._id,
        },
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

export const VerifyOtpPassword = async (email, otp, dispatch, navigation) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    email: email.toLowerCase(),
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
    email: email.toLowerCase(),
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
  // dispatch(UserLogin(config));
  return dispatch(UserLogin(config)).unwrap();
};

export const ForgotPass = async (email, dispatch, navigation) => {
  dispatch(setLoading(true));

  let data = JSON.stringify({
    email: email.toLowerCase(),
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
    gender,
    // long,
    // lat,
    // locName,
    userImage,
    bio,
    postalCode,
    payCreateCustomerId,
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
  if (gender) {
    data.append('gender', gender);
  }
  // if (long) {
  //   data.append('longitude', long);
  // }
  // if (lat) {
  //   data.append('latitude', lat);
  // }
  // if (locName) {
  //   data.append('locationName', locName);
  // }
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
  if (payCreateCustomerId) {
    data.append('payCreateCustomerId', payCreateCustomerId);
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
    if (response?.data?.success) {
      dispatch(setProfileCreated(response?.data?.data?.profileCreted));
      dispatch(setUserData(response.data.data));
    }
    // ShowToast('success', response.data.msg);
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    // ShowToast('error', 'error.response.data.msg');
    console.log('error', error.response.data.msg);
    dispatch(setLoading(false));
    throw error;
  }
};
export const getAllShops = async barName => {
  const query = barName ? `?barName=${barName}` : '';
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.allShops}${query}`,
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
    url: `https://appsdemo.pro/Sipline-Backend/api/user/nearbyShops?longitude=${lng}&latitude=${lat}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    console.log('response.data', response.data);
    if (!response?.data?.success) {
      return ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
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

export const applyCouponCode = async (couponCode, dispatch) => {
  dispatch(setLoading(true));
  // let data = JSON.stringify({
  //   couponCode: couponCode,
  // });

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://appsdemo.pro/Sipline-Backend/api/user/getcoupon?couponCode=${couponCode}`,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // data: data,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    console.log('reeessss', response);
    dispatch(setLoading(false));
    if (response.data.success) {
      ShowToast('success', 'Coupon Applied');
    } else {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    console.log('eeroorr', error.response.data.msg);
    ShowToast('error', error.response.data.msg);
    dispatch(setLoading(false));
    throw error;
  }
};

export const placeOrder = async (
  userId,
  adminId,
  shopId,
  products,
  date,
  subTotal,
  couponDiscount,
  salesTax,
  platFormCharges,
  grandTotal,
  transactionId,
  dispatch,
) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    userId: userId,
    adminId: adminId,
    shopId: shopId,
    product: products,
    date: date, //'25-05-2025'
    subTotal: subTotal, //250
    couponDiscount: couponDiscount, //0
    salesTax: salesTax, //15
    platFormCharges: platFormCharges, //20
    grandTotal: grandTotal, //285
    transactionId: transactionId,
    transactionStatus: 'Approved',
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.createOrder}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('response.data', response.data);
    dispatch(setLoading(false));
    if (response.data.success) {
      dispatch(setClearProducts());
      ShowToast('success', response.data.msg);
    } else {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};

export const getAllOrdersByStatus = async (userId, status, dispatch) => {
  // dispatch(setLoading(true));
  const url = `${baseUrl}${endPoints.orderStatus}?userId=${userId}${
    status ? `&status=${status}` : ''
  }`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    // dispatch(setLoading(false));
    if (response.data.success) {
      console.log('res', response.data.msg);
      ShowToast(
        'success',
        response.data.msg === 'All Orders By UserId!'
          ? 'All Orders'
          : response.data.msg,
      );
    } else {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    // dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};
export const getOrderByOrderId = async orderId => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/getOrderById?orderId=${orderId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addReview = async (
  userId,
  type,
  adminId,
  shopId,
  stars,
  drinkQuality,
  serviceSpeed,
  text,
  dispatch,
) => {
  dispatch(setLoading(true));
  let data = JSON.stringify({
    userId: userId,
    type: type,
    adminId: adminId,
    shopId: shopId,
    stars: stars,
    drinkQuality: drinkQuality,
    serviceSpeed: serviceSpeed,
    text: text,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.addReview}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  console.log('data', data);
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
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.message);
    throw error;
  }
};
export const addToFavourites = async (userId, id, type) => {
  let payload = {userId};

  if (type === 'shop') {
    payload.shopId = id;
  }
  if (type === 'product') {
    payload.productId = id;
  }

  let data = JSON.stringify(payload);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.addOrRemoveWishList}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    if (response.data.success) {
      ShowToast('success', response.data.msg);
    } else {
      ShowToast('error', response.data.msg);
    }
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};
export const getAllProducts = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/searchProducts`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    // Return only the first 10 products
    console.log('rrerersponse', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const searchProduct = async (
  name,
  // category,
  // rating,
  // min,
  // max,
  // dispatch,
) => {
  // dispatch(setLoading(true));

  // Create a params object with only defined values
  const params = new URLSearchParams();

  if (name) {
    params.append('name', name);
  }
  // if (category) {
  //   params.append('category', category);
  // }
  // if (rating) {
  //   params.append('Rating', rating);
  // }
  // if (min) {
  //   params.append('minPrice', min);
  // }
  // if (max) {
  //   params.append('maxPrice', max);
  // }

  const url = `${baseUrl}user/searchProducts?${params.toString()}`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    // dispatch(setLoading(false));
    console.log('responseddsds', response.data);
    return response.data;
  } catch (error) {
    // dispatch(setLoading(false));
    ShowToast('error', error.response?.data?.msg || 'Something went wrong');
    throw error;
  }
};
export const getAllFavourites = async (userId, dispatch) => {
  dispatch(setLoading(true));
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.wishList}?userId=${userId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    dispatch(setLoading(false));
    if (!response.data.success) {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);

    throw error;
  }
};
export const getShopById = async shopId => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.shopById}?shopId=${shopId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    if (!response.data.success) {
      ShowToast('error', response.data.msg);
    }
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};
export const getAllNotifications = async (userId, dispatch) => {
  dispatch(setLoading(true));
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}${endPoints.notifications}?userId=${userId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    dispatch(setLoading(false));
    if (!response.data.success) {
      ShowToast('error', response.data.msg);
    }
    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    ShowToast('error', error.response.data.msg);
    throw error;
  }
};
export const createCustomer = async (
  identifier,
  customerNumber,
  firstName,
  lastName,
  email,
  website,
  phone,
  alternatePhone,
  token,
) => {
  const username = 'iLdgQCp96166pl16sAfwQath2wk9I8Xb';
  const password = '7766';

  const basicAuthToken = Buffer.from(`${username}:${password}`).toString(
    'base64',
  );
  let data = JSON.stringify({
    identifier: identifier, //SiplineCustomer
    customer_number: customerNumber, //"1122334455"
    first_name: firstName,
    last_name: lastName,
    email: email,
    website: website,
    phone: phone,
    alternate_phone: alternatePhone,
    active: true,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.sandbox.paycreategateway.com/api/v2/customers',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuthToken}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('response.status ===>', response?.status);
    console.log('response.data====><><>>>><<<<<<>.....', response?.data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data || error.message;

    // You can log or handle specific errors here if needed
    return {
      status,
      error: true,
      message,
    };
  }
};
export const addPaymentCard = async (
  avs_address,
  avs_zip,
  name,
  expiry_month,
  expiry_year,
  card,
  customerId,
) => {
  let data = JSON.stringify({
    avs_address: avs_address,
    avs_zip: avs_zip,
    name: name,
    expiry_month: expiry_month,
    expiry_year: expiry_year,
    card: card,
  });
  const username = 'iLdgQCp96166pl16sAfwQath2wk9I8Xb';
  const password = '7766';

  const basicAuthToken = Buffer.from(`${username}:${password}`).toString(
    'base64',
  );
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://api.sandbox.paycreategateway.com/api/v2/customers/${customerId}/payment-methods/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuthToken}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    ShowToast('success', 'Card added successfully!');
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.error_details.error);
    throw error;
  }
};
export const getPaymentCards = async customerId => {
  const username = 'iLdgQCp96166pl16sAfwQath2wk9I8Xb';
  const password = '7766';

  const basicAuthToken = Buffer.from(`${username}:${password}`).toString(
    'base64',
  );
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.sandbox.paycreategateway.com/api/v2/customers/${customerId}/payment-methods/`,
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
    },
  };
  try {
    const response = await axios.request(config);
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createTransaction = async (
  amount,
  currency,
  source,
  description,
  customerId,
  email,
) => {
  let data = JSON.stringify({
    amount: amount,
    currency: currency, //USD
    source: `pm-${source}`,
    description: description, //Charge using saved card
    customer: {
      customer_id: Number(customerId),
      email: email,
    },
    capture: true,
  });
  const username = 'iLdgQCp96166pl16sAfwQath2wk9I8Xb';
  const password = '7766';

  const basicAuthToken = Buffer.from(`${username}:${password}`).toString(
    'base64',
  );
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.sandbox.paycreategateway.com/api/v2/transactions/charge',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuthToken}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('response.data', response.data);
    console.log('response.data', response.status);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createRefundRequest = async (
  userId,
  shopId,
  adminId,
  orderId,
  transactionId,
  products,
  condition,
  reason,
  shippingMethod,
  receivingMethod,
) => {
  const productIds = products?.map(item => item.productId);
  let data = JSON.stringify({
    userId: userId,
    shopId: shopId,
    adminId: adminId,
    orderId: orderId,
    transactionId: transactionId,
    products: productIds,
    condition: condition,
    reason: reason,
    shippingMethod: 'Standard',
    receivingMethod: receivingMethod,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/createRefundRequest`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error.response.data);
    throw error;
  }
};
export const getAllFeatures = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}superAdmin/getAllFeatures`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addLocation = async (userId, lat, long, locName, category) => {
  let data = JSON.stringify({
    userId: userId,
    latitude: lat,
    longitude: long,
    locationName: locName,
    title: category,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/addLocation`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllLocations = async userId => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/getAllUserLocations?userId=${userId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const selectLocation = async (userId, locId) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/selectLocation?userId=${userId}&locationId=${locId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const editLocation = async (locId, long, lat, locName, title) => {
  let data = JSON.stringify({
    locationId: locId,
    longitude: long,
    latitude: lat,
    locationName: locName,
    title: title,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/editLocation`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async userId => {
  let data = JSON.stringify({
    userId: userId,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}user/deleteUser`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
