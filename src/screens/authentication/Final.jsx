/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Wrapper from '../../utils/Wrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import SuccessMessage from '../../components/SuccessMessage';
import Background from '../../utils/Background';
import {H6} from '../../utils/Text';
import {Color} from '../../utils/Colors';
import {TouchableOpacity, View} from 'react-native';

const Final = ({navigation, route}) => {
  return (
    <>
      <Background>
        <Wrapper style={{height: hp('85%'), justifyContent: 'center'}}>
          <Br space={3} />
          <SuccessMessage
            title={route?.params?.title?.toString() || 'All Set'}
            message={route?.params?.msg?.toString() || 'Welcome to the Sipline'}
          />
        </Wrapper>
      </Background>
      <Btn
        onPress={() => {
          if (route?.params?.deleteCard) {
            navigation.goBack();
          } else {
            navigation.navigate('Home');
          }
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: hp('7%'),
          width: wp('88%'),
          alignSelf: 'center',
        }}>
        {route?.params?.deleteCard ? route?.params?.deleteCard : 'Get Started'}
      </Btn>
      <View
        style={{
          position: 'absolute',
          zIndex: 9999,
          bottom: hp('2%'),
          width: wp('88%'),
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <H6 style={{textAlign: 'center'}} color={Color('text')}>
            {route?.params?.noThanks?.toString()}
          </H6>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Final;
