
/* eslint-disable react-native/no-inline-styles */
import React, {useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { H4, Pera } from '../../utils/Text';
import Input from '../../components/Input';
import { Call, Eye, Sms, Unlock } from 'iconsax-react-native';
import { Color } from '../../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import RadioBtn from '../../components/RadioBtn';
import {  Pressable,  View } from 'react-native';
import Btn from '../../components/Btn';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoading } from '../../redux/Actions/AuthActions';
import { Message } from '../../utils/Alert';

const Signup = ({ navigation }) => {
    const validator = require('validator');
    const dispatch = useDispatch();
    const loader = useSelector((state) => state?.auth?.loadingState);
    const [formState, setFormState] = useState({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleChange = (value, text) => {
        setFormState({
            ...formState,
            [value]: text,
        });
    };

    const isValid = () => {
        if (validator.isEmpty(formState?.email)) {
            Message('Email is required!', 'Please enter your email.');
            return false;
        }
        if (!validator.isEmail(formState?.email)) {
            Message('Email is not valid!', 'Please enter your valid email address.');
            return false;
        }

        if (validator.isEmpty(formState?.phone)) {
            Message('Phone number is required!', 'Please enter your phone number.');
            return false;
        }

        if (validator.isEmpty(formState?.password)) {
            Message('Password is required!', 'Please enter your password.');
            return false;
        }
        if (!validator.isStrongPassword(formState?.password)) {
            Message('Password is weak!', 'Please enter a strong password that contains letters, numbers and a special character.');
            return false;
        }

        if (validator.isEmpty(formState?.confirmPassword)) {
            Message('Confirm Password is required!', 'Please re-enter your password.');
            return false;
        }
        if (!validator.equals(formState?.confirmPassword, formState?.password)) {
            Message('Password not matched!', 'Please re-check the confirm password.');
            return false;
        }
        if (!agreeToTerms) {
            Message('Kindly Accept Our terms!', 'you need to agree our terms of use and privacy policy.');
            return false;
        }
        return true;
    };

    const handleSignup = () => {
        const checkValidation = isValid();
        alert(checkValidation)
        if (checkValidation) {
            return dispatch(handleLoading(formState, navigation));

        }
    };

    return (
        <AuthLayout navigation={navigation}>
            <Wrapper>
                <Br space={3} />
                <H4 bold style={{ textAlign: 'center' }}>Signup</H4>
                <Pera style={{ textAlign: 'center' }}>Fill all the fields to signup</Pera>
                <Br space={3} />

                <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>Email</Pera>
                <Input
                    leftIcon={
                        <Sms size={hp('3%')}
                            color={Color('inputIcons')}
                        />
                    }
                    styling={{ marginBottom: hp('2%') }}
                    placeholder={'Email'}
                    onChangeText={(text) => handleChange('email', text)}
                />


                <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>Phone</Pera>
                <Input
                    leftIcon={
                        <Call
                            size={hp('3%')}
                            color={Color('inputIcons')}
                        />
                    }
                    styling={{ marginBottom: hp('2%') }}
                    onChangeText={(text) => handleChange('phone', text)}
                    placeholder={'Phone'}
                    keyboardType="number-pad"

                />

                <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>Password</Pera>
                <Input
                    leftIcon={
                        <Unlock
                            size={hp('3%')}
                            color={Color('inputIcons')}
                        />
                    }
                    rightIcon={
                        <Eye
                            size={hp('3%')}
                            color={Color('text')}
                        />
                    }
                    styling={{ marginBottom: hp('2%') }}
                    secureTextEntry
                    onChangeText={(text) => handleChange('password', text)}
                    placeholder={'Password'}

                />

                <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>Confirm Password</Pera>
                <Input
                    leftIcon={
                        <Unlock
                            size={hp('3%')}
                            color={Color('inputIcons')}
                        />
                    }
                    rightIcon={
                        <Eye
                            size={hp('3%')}
                            color={Color('text')}
                        />
                    }
                    secureTextEntry
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    placeholder={'Confirm Password'}
                />
                <Br space={1.5} />
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <RadioBtn
                        isChecked={agreeToTerms}
                        onPress={() => { setAgreeToTerms(!agreeToTerms); }}
                        radioClr={Color('headerIconBg')}
                    />
                    <View style={{ flexDirection: 'row', gap: 3, width: wp('80%'), flexWrap: 'wrap' }}>
                        <Pera>By continuing you accept our</Pera>
                        <Pera>Privacy Policy</Pera>
                        <Pera>and</Pera>
                        <Pera>Term of Use</Pera>
                    </View>
                </View>
                <Br space={3} />
                <Btn loading={loader} onPress={handleSignup}>
                    Signup
                </Btn>


                <Br space={2} />
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                    <Pera style={{ textAlign: 'center' }}>Already have an account?</Pera>
                    <Pressable
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Pera bold>Login</Pera>
                    </Pressable>
                </View>
                <Br space={2} />
            </Wrapper>
        </AuthLayout>
    );
};

export default Signup;
