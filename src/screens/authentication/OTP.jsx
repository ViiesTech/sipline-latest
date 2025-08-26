/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import {H4, Pera} from '../../utils/Text';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import OTPInput from '../../components/OTPInput';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword, handleOtpCode} from '../../redux/Actions/AuthActions';
import {Message} from '../../utils/Alert';
import {VerifyOtpPassword, VerifyUser} from '../../GlobalFunctions/Apis';
import {responsiveHeight} from '../../utils/Responsive';

const OTP = ({navigation, route}) => {
  const validator = require('validator');
  const [otpCode, setOtpCode] = useState('');
  const loading = useSelector(state => state.user.isLoading);

  const dispatch = useDispatch();
  console.log('otpCode', otpCode);
  console.log('route.params===', route.params);
  const {email, token, type} = route?.params;
  const isValid = () => {
    if (validator.isEmpty(otpCode?.toString())) {
      Message('OTP is required!', 'Please enter the OTP you received.');
      return false;
    }
    if (otpCode.toString().length < 4) {
      Message('OTP is not valid!', 'Please enter a valid OTP.');
      return false;
    }
    return true;
  };

  const otpVerification = async () => {
    const checkValidations = isValid();
    if (checkValidations) {
      type === 'forgotPass'
        ? await VerifyOtpPassword(email, otpCode, dispatch, navigation)
        : await VerifyUser(email, otpCode, token, navigation, dispatch);
      // dispatch(handleOtpCode(otpCode, navigation,route?.params?.customerID));
    }
  };

  const resendCode = () => {
    // dispatch(forgetPassword(route.params.email, navigation));
  };

  return (
    <>
      <AuthLayout navigation={navigation}>
        <View style={{flex: 1}}>
          <Wrapper>
            <Br space={3} />
            <H4 bold style={{textAlign: 'center'}}>
              OTP
            </H4>
            <Pera style={{textAlign: 'center'}}>
              We have sent you an email containing 4 digits verification code.
              Please enter the code to verify your identity
            </Pera>
            <Br space={3} />
            <OTPInput inputs={4} onComplete={otp => setOtpCode(otp)} />
          </Wrapper>
          <View style={{marginTop:responsiveHeight(2)}}>
            <View
              style={{
                // position: 'absolute',
                zIndex: 1,
                // bottom: hp('3%'),
                width: wp('88%'),
                alignSelf: 'center',
              }}>
              <Pera style={{textAlign: 'center'}}>Code Didn't received?</Pera>
              <TouchableOpacity onPress={resendCode}>
                <H4 style={{textAlign: 'center'}} medium>
                  Resend Code
                </H4>
              </TouchableOpacity>
              <Br space={5} />
              <Btn loading={loading} onPress={otpVerification}>
                Next
              </Btn>
            </View>
          </View>
        </View>
      </AuthLayout>
    </>
  );
};

export default OTP;
