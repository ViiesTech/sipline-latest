/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {H4, H6, Small} from '../utils/Text';
import {Color} from '../utils/Colors';
import KFC from '../assets/images/Kfc.png';
import {default as Clipboard} from '@react-native-clipboard/clipboard';
import {useDispatch, useSelector} from 'react-redux';
import {setAdminId} from '../reduxNew/Slices';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';

const DiscountCard = ({
  imgUrl,
  couponCode,
  adminId,
  percentageAmout,
  brandName,
  expiry,
  getCouponCode,
}) => {
  const dispatch = useDispatch();
  const couponBy = useSelector(state => state.user.adminId);
  console.log('adminId', couponBy);
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={{
          width: wp('96%'),
          paddingVertical: hp('5%'),
          justifyContent: 'center',
        }}
        source={require('../assets/images/discountBg.png')}>
        <TouchableOpacity
          onLongPress={() => {
            Clipboard.setString(couponCode);

            if (Platform.OS === 'android') {
              ToastAndroid.show(
                'Coupon code copied to clipboard!',
                ToastAndroid.SHORT,
              );
            } else {
              Alert.alert('Copied!', 'Coupon code copied to clipboard!');
            }

            dispatch(setAdminId(adminId));
          }}
          onPress={getCouponCode}
          style={{
            paddingHorizontal: wp('5%'),
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              // source={{ uri: imgUrl }}
              source={imgUrl}
              resizeMode="stretch"
              style={{
                width: responsiveWidth(28),
                height: responsiveHeight(9),
                borderRadius: wp('2%'),
              }}
            />
          </View>
          <View
            style={{
              width: 1,
              height: hp('10%'),
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: Color('inputIcons'),
              opacity: 0.5,
            }}
          />
          <View style={{width: wp('30%')}}>
            <H4
              numberOfLines={1}
              style={{marginBottom: wp(1)}}
              color={Color('text')}
              bold>
              {percentageAmout}
            </H4>
            <H6 numberOfLines={1} style={{marginBottom: wp('2%')}}>
              {brandName?.replace(/\b\w/g, l => l.toUpperCase())}
            </H6>
            {couponCode && (
              <Small numberOfLines={1}>Coupon Code {couponCode}</Small>
            )}
            <Small numberOfLines={1}>Valid till {expiry}</Small>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};

export default DiscountCard;
