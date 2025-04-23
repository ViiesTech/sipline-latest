/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { H4, H6, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import KFC from '../assets/images/Kfc.png'

const DiscountCard = ({ imgUrl, percentageAmout, brandName, expiry, getCouponCode }) => {

    return (
        <>
            <ImageBackground
                resizeMode="stretch"
                style={{
                    width: wp('96%'),
                    paddingVertical: hp('5%'),
                    justifyContent: 'center',
                }}
                source={require('../assets/images/discountBg.png')}
            >
                <TouchableOpacity onPress={getCouponCode} style={{ paddingHorizontal: wp('5%'), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }} >
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            // source={{ uri: imgUrl }}
                            source={KFC}
                            resizeMode="contain"
                            style={{ width: wp('25%'), height: wp('25%'), borderRadius: wp('2%') }} />
                    </View>
                    <View style={{
                        width: 1,
                        height: hp('10%'),
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        borderColor: Color('inputIcons'),
                        opacity: 0.5,
                    }}
                    />
                    <View style={{ width: wp('30%') }}>
                        <H4 numberOfLines={1} style={{ marginBottom: wp(1) }} color={Color('text')} bold>{percentageAmout}</H4>
                        <H6 numberOfLines={1} style={{ marginBottom: wp('2%') }}>{brandName?.replace(/\b\w/g, l => l.toUpperCase())}</H6>
                        <Small numberOfLines={1}>Valid till {expiry}</Small>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </>
    );
};

export default DiscountCard;
