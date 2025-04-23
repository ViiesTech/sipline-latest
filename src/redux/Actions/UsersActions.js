import AsyncStorage from '@react-native-async-storage/async-storage';
import { DISCOUNTS_COUPONS, IN_APP_LOADING_STATE, NOTIFICATION_LIST, ORDER_HISTORY, PRIVACY_POLICY, RETURN_POLICY, SELECTED_ORDER_STATUS, TERMS_AND_CONDITIONS, WISH_LIST } from '../Reducer/UsersReducers';
import axios from 'axios';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_contents';
import { Message } from '../../utils/Alert';
import { handleLoginPermissions } from './AuthActions';
import { ToastAndroid } from 'react-native';


// All users or customer related to selected id of the user is being processed here.

// privacy section Api
export const handlePrivacy = () => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.privacyPolicy}`, { headers: { Authorization: `Bearer ${extractToken?.token}` } });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
      dispatch({ type: PRIVACY_POLICY, payload: res.data?.data });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });

    }
  };
};

// Terms And Conditions section Api
export const handleTermsConditions = () => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.termsCondition}`, { headers: { Authorization: `Bearer ${extractToken?.token}` } });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
      dispatch({ type: TERMS_AND_CONDITIONS, payload: res.data?.data });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });

    }
  };
};

// Return Policy section Api
export const handleReturnPolicy = () => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.returnPolicy}`, { headers: { Authorization: `Bearer ${extractToken?.token}` } });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
      dispatch({ type: RETURN_POLICY, payload: res.data?.data });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });

    }
  };
};

// Support Message section Api
export const handleSupport = (msgQuery, setMsg, navigation) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${extractToken?.token}`,
      };
      const res = await axios.post(`${baseUrl}${endPoints.support}`, { message: msgQuery?.toString() }, { headers: headers });
      Message(res.data?.title, res.data?.message);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
      setMsg('');
      navigation.goBack();
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

//Discounted Coupons Api
export const handleDiscountCoupon = (queryValue) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const query = queryValue?.toLowerCase();
      const res = await axios.get(
        `${baseUrl}${endPoints.discountCoupon}?q=${query}&country=${extractToken?.country}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      }
      );
      dispatch({ type: DISCOUNTS_COUPONS, payload: res.data?.data });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

// Logout API: just cleaning the Async_Local_Engine
export const handleLogout = (navigation) => {
  return async () => {
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiRemove(keys).then(() => {
        navigation.navigate('Login');
      });
    });
  };
};

// update User Profile
export const handleProfileUpdate = (allStateData, dob) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_APP_LOADING_STATE, payload: true });
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${extractToken?.token}`,
      };
      const res = await axios.put(`${baseUrl}${endPoints.editProfile}`,
        {
          full_name: allStateData?.full_name?.toString(),
          bio: allStateData?.bio?.toString(),
          date_of_birth: dob.toString(),
          gender: allStateData?.gender?.toString(),
          image_name: allStateData?.image_name,
          profile_image: allStateData?.profile_image,
        },
        { headers: headers });
      Message(res.data?.title, res.data?.message);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });

      const jsonValue = JSON.stringify(res.data?.data);
      await AsyncStorage.setItem('signCredentials', jsonValue);

      dispatch(handleLoginPermissions());
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

//NotificationS list
export const handleNotificationsList = () => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.notifications}`, { headers: { Authorization: `Bearer ${extractToken?.token}` } });
      dispatch({ type: NOTIFICATION_LIST, payload: res.data?.data });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

//NotificationS list Red
export const handleNotificationsRead = (id) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      await axios.put(`${baseUrl}${endPoints.notificationsRead}`,
        { notification_id: id },
        { headers: { Authorization: `Bearer ${extractToken?.token}` } });
      dispatch(handleNotificationsList());
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

//All Order History
export const handleOrderHistory = (queryValue) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const query = queryValue?.toLowerCase();
      const res = await axios.get(
        `${baseUrl}${endPoints.orderHistory}?q=${query}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: ORDER_HISTORY, payload: res.data?.data });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

//Order Status
export const handleOrderStatus = (orderId, refresh, setRefreshing) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(
        `${baseUrl}${endPoints.orderStatus}?order_id=${orderId}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: SELECTED_ORDER_STATUS, payload: res.data?.data });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
      if (refresh) {
        setRefreshing(false);
      }
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
      if (refresh) {
        setRefreshing(false);
      }
    }
  };
};

//Order FeedBack
export const HandleFeedback = (orderId, barId, ratings, drinkQuality, serviceSpeed, remarks) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.post(`${baseUrl}${endPoints.orderFeedBack}`,
        {
          order_id: orderId,
          bar_id: barId,
          ratings: ratings,
          drink_quality: drinkQuality,
          service_speed: serviceSpeed,
          remarks: remarks,

        },
        { headers: { Authorization: `Bearer ${extractToken?.token}` } });
      Message(res.data?.title, res.data?.message);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    }
  };
};

// get Wish lists
export const handleWishList = (pageIndex) => {
  return async (dispatch) => {
    dispatch({ type: IN_APP_LOADING_STATE, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(
        `${baseUrl}${endPoints.wishList}?page=${pageIndex}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: WISH_LIST, payload: { 'wishListItems': res?.data?.data[0], 'lastPage': res?.data?.data[1] } });
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: IN_APP_LOADING_STATE, payload: false });

    }
  };
};

// add or remove wish lists
export const handleAddOrRemoveWishList = (bardId) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      await axios.post(
        `${baseUrl}${endPoints.addOrRemoveWishList}`, {
          bar_id:bardId,
        },
        {
          headers: {
            Authorization: `Bearer ${extractToken?.token}`,
          },
        });
        ToastAndroid.show('Your Wish list is updates successfully!',ToastAndroid.SHORT);
    } catch (error) {
      errHandler(error);
    }
  };
};
