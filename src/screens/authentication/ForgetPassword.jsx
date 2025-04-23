
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { H4, Pera } from '../../utils/Text';
import Input from '../../components/Input';
import { Sms } from 'iconsax-react-native';
import { Color } from '../../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/Actions/AuthActions';
import { Message } from '../../utils/Alert';

const ForgetPassword = ({ navigation }) => {
    const validator = require('validator');
    const [mail, setMail] = useState('');
    const loader = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleForgetPassword = () => {
        if (validator.isEmpty(mail)) {
            Message('Email is required!', 'Please enter your email.');
            return false;
        }
        if (!validator.isEmail(mail)) {
            Message('Email is not valid!', 'Please enter your valid email address.');
            return false;
        }
        dispatch(forgetPassword(mail, navigation));
    };

    return (
        <>
            <AuthLayout navigation={navigation}>
                <Wrapper>
                    <Br space={3} />
                    <H4 bold style={{ textAlign: 'center' }}>Forgot Password</H4>
                    <Pera style={{ textAlign: 'center' }}>Please enter your email to reset password</Pera>
                    <Br space={3} />
                    <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>{'Email Address'}</Pera>
                    <Input
                        placeholder={'Email Address'}
                        leftIcon={
                            <Sms
                                size={hp('3%')}
                                color={Color('inputIcons')}
                            />
                        }
                        styling={{ marginBottom: hp('2%') }}
                        onChangeText={(text) => setMail(text)}
                    />
                </Wrapper>
            </AuthLayout>
            <Btn
                loading={loader?.loadingState}
                onPress={handleForgetPassword}
                style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), width: wp('88%'), alignSelf: 'center' }}>
                Next
            </Btn>
        </>
    );
};

export default ForgetPassword;
