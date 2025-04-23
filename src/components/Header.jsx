/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { H6, Pera } from '../utils/Text';
import { ArrowDown2, ArrowLeft2, Notification, SearchNormal, TextalignCenter, TextalignLeft } from 'iconsax-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import { useSelector } from 'react-redux';

const Header = ({ navigation, onlyTitle, onlyBack, withSearch, withBack, title, children, fixed, titleColor, setState}) => {
    const iconSize = hp('2.6%');
    const fixedStyle = fixed ? {
        position: 'absolute',
        left: wp('6%'),
        top: hp('5.3%'),
        width: wp('82%'),
        zIndex: 2,
    } : {};
    const userData = useSelector(state => state?.auth?.permission?.allUserData);

    const Left = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('3%') }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={{ backgroundColor: Color('headerIconBg'), padding: hp('1%'), borderRadius: hp('100%') }}>
                        <TextalignLeft size={iconSize} color={Color('headerIcon')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setState(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Pera>My location</Pera>
                        <ArrowDown2 size={hp('2.2%')} color={Color('text')} />
                    </View>
                    {/* <Pera extraBold>{`${userData?.city}, ${userData?.country?.toUpperCase()}` || 'California, United State'}</Pera> */}
                    <Pera extraBold>{'California, United State'}</Pera>
                </TouchableOpacity>
            </View>
        );
    };
    const Right = () => {
        return (
            <View style={{ flexDirection: 'row', gap: wp('5%') }}>
                <TextalignCenter size={iconSize} color={Color('text')} />
                <TouchableOpacity  onPress={() => navigation.navigate('Search')}>
                    <SearchNormal size={iconSize} color={Color('text')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Notification size={iconSize} color={Color('text')} />
                </TouchableOpacity>
            </View>
        );
    };

    if (withSearch) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, ...fixedStyle }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ backgroundColor: Color('headerIconBg'), padding: hp('0.8%'), borderRadius: hp('100%') }}>
                        <ArrowLeft2 size={hp('2%')} color={Color('headerIcon')} />
                    </View>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: Color('headerIcon'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: hp('50%'),
                    borderWidth: 1,
                    borderColor: Color('mapSearchBorder'),
                    paddingVertical: hp('0.5%'),
                    paddingRight: wp('5%'),
                    width: wp('77%'),
                }}>
                    <TextInput
                        style={{
                            color: Color('text'),
                            height: hp('4%'),
                            paddingVertical: 0,
                            paddingHorizontal: wp('5%'),
                            fontFamily: 'Inter_18pt-Medium',
                            flexGrow: 1,
                        }}
                        placeholder="Search"
                    />
                    <TouchableOpacity onPress={() => setState(true)}>
                        <TextalignCenter
                            size={hp('2.5%')}
                            color={Color('text')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (onlyBack) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    }else {
                        navigation.replace('Login');
                    }
                }}>
                    <View style={{ backgroundColor: Color('headerIconBg'), padding: hp('0.8%'), borderRadius: 100 }}>
                        <ArrowLeft2 size={hp('2%')} color={Color('headerIcon')} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    if (onlyTitle) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp('1.5%') }}>
                    {withBack && (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={{ backgroundColor: Color('headerIconBg'), padding: hp('0.8%'), borderRadius: 100 }}>
                                <ArrowLeft2 size={hp('2%')} color={Color('headerIcon')} />
                            </View>
                        </TouchableOpacity>
                    )}
                    <H6 color={titleColor}  medium>{title}</H6>
                </View>
                {children}
            </View>
        );
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 1, ...fixedStyle }}>
            <Left />
            <Right />
        </View>
    );
};

export default Header;
