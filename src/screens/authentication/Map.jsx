/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import { H5, Pera } from '../../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import { Keyboard, PermissionsAndroid, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Color } from '../../utils/Colors';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ArrowLeft2, Gps, Location } from 'iconsax-react-native';
import Btn from '../../components/Btn';

const Map = ({ navigation, route }) => {

    const [location, setLocation] = useState();
    const [isToConfirm, setIsToConfirm] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        requestLocationPermission();
    }, []);

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'SipLine App',
                    'message': 'Sipline App access to your location ',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition((pos) => {
                    const crd = pos.coords;
                    setLocation({
                        latitude: crd.latitude,
                        longitude: crd.longitude,
                        latitudeDelta: 0.0421,
                        longitudeDelta: 0.0421,
                    });
                }, (err) => {
                    console.log(err);
                });
            } else {
                console.log('location permission denied');
                alert('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const ConfirmLocation = () => {
        return (
            <View style={{
                backgroundColor: Color('headerIcon'),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderWidth: 1,
                borderColor: Color('inputIcons'),
                padding: hp('3%'),
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 1,
                width: wp('100%'),
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ backgroundColor: Color('headerIconBg'), padding: hp('1.5%'), borderRadius: 100 }}>
                            <Location size={hp('2.2%')} color={Color('headerIcon')} variant="Bold" />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <H5 bold>Street Empire</H5>
                        <Pera>Street lorem ispum area 4567</Pera>
                    </View>
                </View>
                <Br space={4} />
                <Btn onPress={() => navigation.navigate('AddLocation', { locationSelected: true, customerID: route?.params?.customerID })}>
                    Confirm Location
                </Btn>
            </View>
        );
    };

    if (!location) {
        return <View />;
    }

    return (
        <>
            <View style={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
                position: 'absolute',
                top: hp('8%'),
                left: wp('5%'),
                width: wp('88%'),
                zIndex: 1,
            }}>
                <TouchableOpacity
                    // onPress={serchApi}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ backgroundColor: Color('headerIconBg'), padding: hp('0.8%'), borderRadius: 100 }}>
                        <ArrowLeft2 size={hp('3%')} color={Color('headerIcon')} />
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={{
                        backgroundColor: Color('headerIcon'),
                        color: Color('text'),
                        flexGrow: 1,
                        paddingHorizontal: wp('4%'),
                        fontFamily: 'Inter_18pt-Medium',
                        borderColor: Color('mapSearchBorder'),
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                    placeholder="Search"
                    onChangeText={(text) => setSearchText(text)}

                />
            </View>
            <Pressable
                onPress={() => Keyboard.dismiss()}
                style={{ flex: 1 }}>
                {/* <MapView
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: location.latitudeDelta,
                        longitudeDelta: location.longitudeDelta,
                    }}
                    style={styles.map}
                    zoomLevel={12}
                    mapType="standard"
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="User Location"
                        description="Here we are at the moment!"
                    />
                </MapView> */}

                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: hp('5%'),
                    zIndex: 1,
                    right: wp('7%'),
                    backgroundColor: Color('headerIcon'),
                    padding: hp('2%'),
                    borderRadius: 100,
                    shadowColor: Color('text'),
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 5,
                }}
                    onPress={() => setIsToConfirm(true)}
                >
                    <Gps
                        size="32"
                        color={Color('text')}
                        variant="Bold"
                    />
                </TouchableOpacity>
                {isToConfirm && <ConfirmLocation />}
            </Pressable>
        </>
    );
};


const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
});

export default Map;
