/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Background from '../../utils/Background';
import Header from '../../components/Header';
import Wrapper from '../../utils/Wrapper';
import {Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';

const AuthLayout = ({navigation, children, noHeader}) => {
  return (
    <Background noBackground={true}>
      <Wrapper>
        {!noHeader && (
          <Header
            navigation={navigation}
            onlyTitle
            title="Return Policy"
            withBack
            onlyBack
          />
        )}
        <Image
          source={require('../../assets/images/splashLogo2.png')}
          resizeMode="contain"
          style={{
            width: responsiveWidth(65),
            height: responsiveHeight(17),
            alignSelf: 'center',
          }}
        />
        {children}
      </Wrapper>
    </Background>
  );
};

export default AuthLayout;
