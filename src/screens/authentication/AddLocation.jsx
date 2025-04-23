/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { Pera } from '../../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import { Pressable } from 'react-native';
import { Color } from '../../utils/Colors';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { handleLocation } from '../../redux/Actions/AuthActions';
import DeviceInfo from 'react-native-device-info';
import { Message } from '../../utils/Alert';

const AddLocation = ({ navigation, route }) => {
    const isLocation = route?.params?.locationSelected;
    const validator = require('validator');
    const [postalAdd, setPostalAdd] = useState('');
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
    const loader = useSelector((state) => state?.auth?.loadingState);
    const dispatch = useDispatch();

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


    const addUserLocation = () => {
        // getDeviceInfo();
        // if (validator.isEmpty(postalAdd)) {
        //     Message('Postal address is required!', 'Please enter your postal address.');
        //     return false;
        // }
        // dispatch(handleLocation(postalAdd, navigation, route.params?.customerID, deviceInfo));
        navigation.navigate('Final', { title: "All Set", msg: 'Welcome to the Sipline' });
    };

    return (
        <>
            <AuthLayout navigation={navigation}>
                <Wrapper>
                    <Br space={3} />
                    <Pressable onPress={() => {
                        if (!route?.params?.locationSelected) {
                            navigation.navigate('Map', { customerID: route?.params?.customerID });
                        }
                    }} style={{ paddingVertical: hp('2%'), paddingHorizontal: wp('4%'), backgroundColor: Color('headerIconBg'), borderRadius: 10, borderWidth: 1, borderColor: Color('text') }}>
                        <Pera color={Color('headerIcon')}>
                            {
                                isLocation
                                    ?
                                    'New York'
                                    :
                                    '+ Add Location'
                            }
                        </Pera>
                    </Pressable>
                    {
                        isLocation && (
                            <>
                                <Br space={0.5} />
                                <Pressable onPress={() => navigation.navigate('Map', { customerID: route?.params?.customerID })}>
                                    <Pera style={{ marginBottom: hp('0.5%'), textAlign: 'right', paddingLeft: wp('1%') }}>Change Your Address</Pera>
                                </Pressable>
                            </>
                        )
                    }
                    <Br space={2} />
                    <Pera style={{ marginBottom: hp('0.5%'), paddingLeft: wp('1%') }}>Postal Code</Pera>
                    <Input
                        onChangeText={(text) => { setPostalAdd(text); }}
                        keyboardType="numeric" placeholder="12345670" />
                </Wrapper>
            </AuthLayout>
            {/* {
                isLocation && (
                    <Btn

                        loading={loader}
                        onPress={addUserLocation} style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), width: wp('88%'), alignSelf: 'center' }}>
                        Next
                    </Btn>
                )
            } */}
            
                    <Btn
                        // loading={loader}
                        onPress={addUserLocation} style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), width: wp('88%'), alignSelf: 'center' }}>
                        Next
                    </Btn>
        </>
    );
};

export default AddLocation;
