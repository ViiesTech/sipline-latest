/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import {H4, Pera} from '../../utils/Text';
import Input from '../../components/Input';
import {Eye, Unlock} from 'iconsax-react-native';
import {Color} from '../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import {handleResetPassword} from '../../redux/Actions/AuthActions';
import {Message} from '../../utils/Alert';
import {ResetPasswordUser} from '../../GlobalFunctions/Apis';

const ResetPassword = ({navigation, route}) => {
  const validator = require('validator');
  const [user, setUser] = useState({
    password: '',
    confirm_password: '',
  });
  const loading = useSelector(state => state.user.isLoading);
  const dispatch = useDispatch();
  const { userId} = route?.params;

  const isValid = () => {
    if (validator.isEmpty(user?.password)) {
      Message('Password is required!', 'Please enter your password.');
      return false;
    }
    if (!validator.isStrongPassword(user?.password)) {
      Message(
        'Password is weak!',
        'Please enter a strong password that contains letters, numbers and a special character.',
      );
      return false;
    }

    if (validator.isEmpty(user?.confirm_password)) {
      Message(
        'Confirm Password is required!',
        'Please re-enter your password.',
      );
      return false;
    }
    if (!validator.equals(user?.confirm_password, user?.password)) {
      Message('Password not matched!', 'Please re-check the confirm password.');
      return false;
    }
    return true;
  };

  const resetUserPassword = async () => {
    const checkValidations = isValid();
    if (checkValidations) {
      await ResetPasswordUser(userId, user.password, navigation,dispatch);
      // dispatch(handleResetPassword(user, navigation,route?.params.customerID));
    }
  };

  return (
    <>
      <AuthLayout navigation={navigation}>
        <Wrapper>
          <Br space={3} />
          <H4 bold style={{textAlign: 'center'}}>
            Reset Password
          </H4>
          <Pera style={{textAlign: 'center'}}>
            Please enter your new password to reset password
          </Pera>
          <Br space={3} />

          <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
            New Password
          </Pera>
          <Input
            leftIcon={<Unlock size={hp('3%')} color={Color('inputIcons')} />}
            rightIcon={<Eye size={hp('3%')} color={Color('text')} />}
            styling={{marginBottom: hp('2%')}}
            secureTextEntry
            onChangeText={value => setUser({...user, password: value})}
          />

          <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
            Confirm Password
          </Pera>
          <Input
            leftIcon={<Unlock size={hp('3%')} color={Color('inputIcons')} />}
            rightIcon={<Eye size={hp('3%')} color={Color('text')} />}
            onChangeText={value => setUser({...user, confirm_password: value})}
            secureTextEntry
          />
        </Wrapper>
      </AuthLayout>
      <Btn
        loading={loading}
        onPress={resetUserPassword}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: hp('3%'),
          width: wp('88%'),
          alignSelf: 'center',
        }}>
        Reset
      </Btn>
    </>
  );
};

export default ResetPassword;
