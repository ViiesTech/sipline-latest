/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ratings from './Ratings';
import { Color } from '../utils/Colors';
import { H5, Pera } from '../utils/Text';

const Bar = ({style, onPress,imgUrl,brandName,barDetails,ratings}) => {
    return (
        <Pressable
        onPress={onPress}
        style={style}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: wp('5%'),
                marginBottom: hp('1%'),
            }}>
                <Image
                    // source={{
                    //     uri: imgUrl || 'https://lasinfoniavietnam.com/wp-content/uploads/2023/06/Terraco-view-1.jpg',
                    // }}
                    source={{uri:imgUrl}}
                    style={{width: wp('35%'), height: wp('35%'), borderRadius: hp('1%')}}
                />
                <View style={{width: wp('48%'), paddingVertical: hp('1%')}}>
                    <Ratings
                        ratings={ratings}
                        color={Color('text')}
                    />
                    <H5 style={{marginBottom: hp('0.5%')}} numberOfLines={1} medium>{brandName}</H5>
                    <Pera color={Color('inputIcons')} numberOfLines={3}>{barDetails}</Pera>
                </View>
            </View>
        </Pressable>
    );
};

export default Bar;
