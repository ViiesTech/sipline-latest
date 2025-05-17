/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import {StyleSheet, View} from 'react-native';
import {Pera} from '../utils/Text';
import Br from '../components/Br';
import Input from '../components/Input';
import {Call, Sms, User} from 'iconsax-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import Btn from '../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleSupport} from '../redux/Actions/UsersActions';
import {Message} from '../utils/Alert';
import {addContactSupport} from '../GlobalFunctions/Apis';

const SupportMsg = 'Write your message here and tell us your query in details.';

const Support = ({navigation}) => {
  const validator = require('validator');
  const dispatch = useDispatch();
  const {isLoading, userData} = useSelector(state => state?.user);
  const [msg, setMsg] = useState('');
  const [userDetails, setUserDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });

  console.log('userData', userData);
  console.log('userDetails', userDetails, msg);

  const handleSupportMessage = async () => {
    if (validator.isEmpty(msg)) {
      Message('Message is required!', 'Please enter your Message.');
      return false;
    }
    const {email, name, phone} = userDetails;
    await addContactSupport(userData._id, name, email, phone, msg, dispatch);
  };

  return (
    <Background>
      <Wrapper>
        <Header navigation={navigation} onlyTitle title="Support" withBack />
        <Br space={2.4} />
        <Pera>{SupportMsg}</Pera>
        <View style={allStyles.subContainer}>
          <Pera style={allStyles.inputTitle}>Full Name</Pera>
          <Input
            leftIcon={<User size={hp('2.5%')} color={Color('inputIcons')} />}
            styling={{marginBottom: hp('2%')}}
            editable={true}
            onChangeText={text => setUserDetails({...userDetails, email: text})}
            placeholder={userData.fullName?.toString()}
          />
          <Pera style={allStyles.inputTitle}>Email Address</Pera>
          <Input
            leftIcon={<Sms size={hp('2.5%')} color={Color('inputIcons')} />}
            styling={{marginBottom: hp('2%')}}
            editable={true}
            onChangeText={text => setUserDetails({...userDetails, name: text})}
            placeholder={userData.email?.toString()}
          />

          <Pera style={allStyles.inputTitle}>Phone</Pera>
          <Input
            editable={true}
            onChangeText={text => setUserDetails({...userDetails, phone: text})}
            placeholder={userData.phone?.toString()}
            leftIcon={<Call size={hp('2.5%')} color={Color('inputIcons')} />}
            styling={{marginBottom: hp('2%')}}
          />
          <Pera style={allStyles.inputTitle}>Your Message</Pera>
          <Input
            value={msg}
            multiline
            numberOfLines={10}
            placeholder={'Write Message Here...'}
            onChangeText={text => setMsg(text)}
          />
        </View>
        <Btn
          onPress={handleSupportMessage}
          loading={isLoading}
          style={allStyles.subMitBtn}>
          Submit
        </Btn>
        <Br space={5} />
      </Wrapper>
    </Background>
  );
};

const allStyles = StyleSheet.create({
  subContainer: {
    marginTop: hp('3.5%'),
  },
  inputTitle: {
    marginBottom: hp('1%'),
    paddingLeft: wp('1%'),
    color: Color('text'),
  },
  subMitBtn: {
    marginTop: hp('3%'),
  },
});

export default Support;
