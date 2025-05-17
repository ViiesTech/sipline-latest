/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Background from '../../utils/Background';
import Header from '../../components/Header';
import Wrapper from '../../utils/Wrapper';
import {Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AuthLayout = ({navigation, children, noHeader}) => {
  return (
    <Background>
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
          source={require('../../assets/images/logo.png')}
          style={{
            width: hp('20%'),
            height: hp('20%'),
            alignSelf: 'center',
          }}
        />
        {children}
      </Wrapper>
    </Background>
  );
};

export default AuthLayout;
