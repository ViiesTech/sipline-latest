
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { H4, Pera } from '../../utils/Text';
import Input from '../../components/Input';
import { Eye, EyeSlash, Sms, Unlock } from 'iconsax-react-native';
import { Color } from '../../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import RadioBtn from '../../components/RadioBtn';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Btn from '../../components/Btn';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { handleSignin } from '../../redux/Actions/AuthActions';
import { Message } from '../../utils/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '../../utils/NavigationContext';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const nav = useNavigation();
    const loader = useSelector(state => state?.auth?.loadingState);
    const validator = require('validator');
    const [radioCheck, setRadioCheck] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [deviceInfo, setDeviceInfo] = useState({
        buildId: '',
        brand: '',
        deviceName: '',
        ipAddress: '',
        manufacturer: '',
        version: '',
        readableVersion: '',
        systemName: '',
        systemVersion: '',
        isTablet: false,
    });
    const getDeviceInfo = async () => {
        const buildId = await DeviceInfo.getBuildId();
        const brand = await DeviceInfo.getBrand();
        const deviceName = await DeviceInfo.getDeviceName();
        const ipAddress = await DeviceInfo.getIpAddress();
        const manufacturer = await DeviceInfo.getManufacturer();
        const version = await DeviceInfo.getVersion();
        const readableVersion = await DeviceInfo.getReadableVersion();
        const systemName = await DeviceInfo.getSystemName();
        const systemVersion = await DeviceInfo.getSystemVersion();
        const isTablet = await DeviceInfo.isTablet();

        setDeviceInfo({
            ...deviceInfo,
            buildId: buildId,
            brand: brand,
            deviceName: deviceName,
            ipAddress: ipAddress,
            manufacturer: manufacturer,
            version: version,
            readableVersion: readableVersion,
            systemName: systemName,
            systemVersion: systemVersion,
            isTablet: isTablet,
        });
    };
    const isValid = () => {
        if (validator.isEmpty(userData.email)) {
            Message('Email is required!', 'Please enter your email.');
            return false;
        }
        if (!validator.isEmail(userData?.email)) {
            Message('Email is not valid!', 'Please enter your valid email address.');
            return false;
        }
        if (validator.isEmpty(userData.password)) {
            Message('Password is required!', 'Please enter your password.');
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        getDeviceInfo();
        // const checkValidation = isValid();
        // if (checkValidation) {
        //     dispatch(handleSignin(userData, navigation, deviceInfo, saveRememberMeKey));
        // }
        nav.navigate('SetProfilePic');
    };


    const saveRememberMeKey = async () => {
        const jsonValue = JSON.stringify('save');
        await AsyncStorage.setItem('isRemember', jsonValue);
    };

    return (
        <AuthLayout navigation={navigation} noHeader>
            <Wrapper>
                <Br space={3} />
                <H4 bold style={{ textAlign: 'center' }}>Login</H4>
                <Pera style={{ textAlign: 'center' }}>Enter your credentials to login</Pera>
                <Br space={3} />
                <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>Email</Pera>
                <Input
                    leftIcon={
                        <Sms
                            size={hp('3%')}
                            color={Color('inputIcons')}
                        />
                    }
                    styling={{ marginBottom: hp('2%') }}
                    placeholder={'Email'}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
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
                        <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                            {
                                secureEntry
                                ?
                                <Eye
                                    size={hp('3%')}
                                    color={Color('text')}
                                />
                                :
                                <EyeSlash
                                    size={hp('3%')}
                                    color={Color('text')}
                                />
                            }
                        </TouchableOpacity>
                    }
                    placeholder={'Password'}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                    secureTextEntry={secureEntry}
                />
                <Br space={1.5} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <RadioBtn
                            onPress={() => {
                                setRadioCheck(!radioCheck);
                            }}
                            isChecked={radioCheck}
                            radioClr={Color('headerIconBg')} />
                        <Pera color={Color('headerIconBg')}>Remember Me</Pera>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                        <Pera color={Color('headerIconBg')}>Forgot Password?</Pera>
                    </TouchableOpacity>
                </View>
                <Br space={3} />
                <Btn
                    loading={loader}
                    onPress={handleLogin}
                >
                    Login
                </Btn>
                <Br space={2} />
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                    <Pera style={{ textAlign: 'center' }}>Don't have an account?</Pera>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Pera bold>Sign Up</Pera>
                    </Pressable>
                </View>
            </Wrapper>
        </AuthLayout>
    );
};

export default Login;
