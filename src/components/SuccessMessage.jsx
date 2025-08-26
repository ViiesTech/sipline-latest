/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import {H3, H6} from '../utils/Text';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';

const SuccessMessage = ({title, message}) => {
  return (
    <View
      style={{
        backgroundColor: Color('headerIconBg'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('7%'),
        borderRadius: 8,
        gap:4,
        width: wp('88%'),
        alignSelf: 'center',
      }}>
      <Image
        // source={require('../assets/images/logo.png')}
        // style={{
        //     width: hp('15%'),
        //     height: hp('15%'),
        //     alignSelf: 'center',
        // }}
        source={require('../assets/images/splashLogo2.png')}
        resizeMode="contain"
        style={{
          width: responsiveWidth(60),
          height: responsiveHeight(20),
          alignSelf: 'center',
        }}
      />

      <H3 style={{textAlign: 'center'}} color={Color('headerIcon')} bold>
        {title}
      </H3>
      <H6 style={{textAlign: 'center'}} color={Color('headerIcon')}>
        {message}
      </H6>
    </View>
  );
};

export default SuccessMessage;
