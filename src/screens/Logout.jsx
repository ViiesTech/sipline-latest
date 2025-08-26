/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import SuccessMessage from '../components/SuccessMessage';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import Btn from '../components/Btn';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {handleLogout} from '../redux/Actions/UsersActions';
import {
  clearAdminId,
  clearLocation,
  clearToken,
  setClearProducts,
} from '../reduxNew/Slices';
import {deleteAccount} from '../GlobalFunctions/Apis';
import {ShowToast} from '../GlobalFunctions/ShowToast';
import {useState} from 'react';

const Logout = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {title, message} = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const {_id} = useSelector(state => state?.user?.userData);
  const callLogout = () => {
    dispatch(clearToken());
    dispatch(clearLocation());
    dispatch(setClearProducts());
      navigation.navigate('AuthStack');

    // navigation?.navigate('AuthStack');
  };
  const deleteAccountHandler = async () => {
    setIsLoading(true);
    try {
      const response = await deleteAccount(_id);
      setIsLoading(false);

      if (response?.success) {
        ShowToast('success', response?.msg);
        dispatch(clearToken());
        dispatch(clearLocation());
        dispatch(setClearProducts());
        navigation?.navigate('AuthStack');
      } else {
        ShowToast('error', response?.msg);
      }
    } catch (error) {
      setIsLoading(false);

      ShowToast('error', error?.response?.data?.msg);
    }
  };

  return (
    <>
      <Background>
        <Wrapper>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('85%'),
            }}>
            <SuccessMessage title={title} message={message} />
          </View>
        </Wrapper>
      </Background>
      <Btn
        loading={isLoading}
        onPress={title === 'Logout' ? callLogout : deleteAccountHandler}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: hp('3%'),
          left: wp('6%'),
          width: wp('88%'),
        }}>
        {title === 'Logout' ? 'Logout' : 'Delete Account'}
      </Btn>
    </>
  );
};

export default Logout;
