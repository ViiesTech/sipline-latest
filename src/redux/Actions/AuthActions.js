import axios from 'axios';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_contents';
import { LOADING_STATE, USER_PERMISSION } from '../Reducer/AuthReducers';
import { Message } from '../../utils/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

// All Auth process of apis and navigation will be done form there.
// Profile set or Signup
export const handleLoading = (allStatesValue, naviagtion) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.signUp}`, {
                email: allStatesValue.email.toString(),
                phone: allStatesValue.phone.toString(),
                password: allStatesValue.password.toString(),
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.replace('SetProfilePic', { customerID: res.data.data.customer_id });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

//Users Profile Updates data
export const handleProfile = (allStatesValue, naviagtion, dob, customerID) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.put(`${baseUrl}${endPoints.profileCreate}`, {
                customer_id: customerID.toString(),
                image_name: allStatesValue?.imageName?.toString(),
                full_name: allStatesValue?.name?.toString(),
                date_of_birth: dob.toString(),
                profile_image: allStatesValue?.base64Img.toString(),
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.navigate('SelectGender', { customerID: customerID });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

// Select gender 
export const handleGenderSelection = (allStatesValue, naviagtion, customerID) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.put(`${baseUrl}${endPoints.genderSelection}`, {
                customer_id: customerID.toString(),
                gender: allStatesValue?.toLowerCase()?.toString(),
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.navigate('Bio', { customerID: customerID });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

// Bio Information for users only
export const handleBioUpdate = (allStatesValue, naviagtion, customerID) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.put(`${baseUrl}${endPoints.upateBio}`, {
                customer_id: customerID.toString(),
                bio: allStatesValue?.toLowerCase()?.toString(),
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.navigate('AddLocation', { customerID: customerID });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

// Add locations (users Choice)
export const handleLocation = (allStatesValue, naviagtion, customerID, deviceInfo) => {

    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.put(`${baseUrl}${endPoints.addlocation}`, {
                'customer_id': customerID,
                'country': 'United State',
                'city': 'karachi',
                'state': 'New York',
                'location': 'Street Empire ',
                'postal_code': allStatesValue,
                'fcm': 'FCM Token',
                'device_info': JSON.stringify(allStatesValue),
            });
            dispatch({ type: LOADING_STATE, payload: false });
            const jsonValue = JSON.stringify(res.data?.data);
            await AsyncStorage.setItem('userCredentials', jsonValue);
            naviagtion.navigate('Final', { title: res?.data?.title, msg: res?.data?.message });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

// Forget Passwords
export const forgetPassword = (allStatesValue, naviagtion) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.get(`${baseUrl}${endPoints.forgetPassword}?email=${allStatesValue}`,);
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.navigate('OTP', { customerID: res.data?.data?.id, email: allStatesValue });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

// Otp Code for Forget Password
export const handleOtpCode = (allStatesValue, naviagtion, customerID) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.otpVerification}`, {
                otp: allStatesValue?.toString(),
                id: customerID,
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.navigate('ResetPassword', { customerID: customerID });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

// Reset Password Api 
export const handleResetPassword = (allStatesValue, naviagtion, customerID) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.put(`${baseUrl}${endPoints.resetPassword}`, {
                id: customerID,
                password: allStatesValue?.password?.toString(),
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            naviagtion.navigate('Login');
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};


// Login api for 
export const handleSignin = (allStatesValue, naviagtion, deviceInfo, saveRememberMeKey) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.signIn}`, {
                'email': allStatesValue.email,
                'password': allStatesValue?.password,
                'device_info': JSON.stringify(deviceInfo),
                'fcm': 'FCM Token',
            });
            dispatch({ type: LOADING_STATE, payload: false });
            Message(res.data?.title, res.data?.message);
            if (res.data?.data?.step_after_login === 'Home') {
                const jsonValue = JSON.stringify(res.data?.data);
                await AsyncStorage.setItem('signCredentials', jsonValue);
                saveRememberMeKey();
                dispatch(handleLoginPermissions());
            }
            naviagtion.replace(res.data?.data?.step_after_login,{ customerID: res.data.data.customer_id });
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};


// Necessary Users Permission and data for users only
export const handleLoginPermissions = () => {
    return async (dispatch) => {
        const isAllowed = await AsyncStorage.getItem('isRemember');
        const userToken = await AsyncStorage.getItem('signCredentials');
        const extractToken = JSON.parse(isAllowed);
        const extractToken2 = JSON.parse(userToken);
        dispatch({ type: USER_PERMISSION, payload: { 'saveRemember': extractToken, 'localToken': extractToken2?.token, 'allUserData': extractToken2 } });
    };
};
