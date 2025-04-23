/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { H4, Pera } from '../../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import OTPInput from '../../components/OTPInput';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, handleOtpCode } from '../../redux/Actions/AuthActions';
import { Message } from '../../utils/Alert';

const OTP = ({ navigation,route }) => {
    const validator = require('validator');
    const [otpCode, setOtpCode] = useState('');
    const loader = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const isValid = () => {
        if (validator.isEmpty(otpCode?.toString())) {
            Message('OTP is required!', 'Please enter the OTP you received.');
            return false;
        }
        if (otpCode.toString().length < 6) {
            Message('OTP is not valid!', 'Please enter a valid OTP.');
            return false;
        }
        return true;
    };

    const otpVerification = () => {
        const checkValidations = isValid();
        if (checkValidations) {
            dispatch(handleOtpCode(otpCode, navigation,route?.params?.customerID));
        }
    };

    const resendCode = () => {
        dispatch(forgetPassword(route.params.email, navigation));
    };

    return (
        <>
            <AuthLayout navigation={navigation}>
                <Wrapper>
                    <Br space={3} />
                    <H4 bold style={{ textAlign: 'center' }}>OTP</H4>
                    <Pera style={{ textAlign: 'center' }}>
                        We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity
                    </Pera>
                    <Br space={3} />
                    <OTPInput inputs={6} onComplete={(otp) => setOtpCode(otp)} />
                </Wrapper>
            </AuthLayout>
            <View style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), width: wp('88%'), alignSelf: 'center' }}>
                <Pera style={{ textAlign: 'center' }}>Code Didn't received?</Pera>
                <TouchableOpacity onPress={resendCode}>
                    <H4 style={{ textAlign: 'center' }} medium>Resend Code</H4>
                </TouchableOpacity>
                <Br space={5} />
                <Btn
                    loading={loader?.loadingState}
                    onPress={otpVerification}>
                    Next
                </Btn>
            </View>
        </>
    );
};


export default OTP;
