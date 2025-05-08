/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import OtpTextInput from 'react-native-text-input-otp';
import {Color} from '../utils/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const OTPInput = ({inputs, onComplete}) => {
  const [otp, setOtp] = useState('');
  useEffect(() => {
    if (otp.length === inputs) {
      onComplete(otp);
    }
  }, [otp]);
  return (
    <OtpTextInput
      style={{
        height: hp('7%'),
        borderColor: Color('text'),
        justifyContent: 'center',
        backgroundColor: Color('headerIcon'),
      }}
      fontStyle={{color: Color('text')}}
      otp={otp}
      setOtp={setOtp}
      digits={inputs}
    />
  );
};

export default OTPInput;
