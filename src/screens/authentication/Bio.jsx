/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import {H4, Pera} from '../../utils/Text';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import {Message} from '../../utils/Alert';
import {handleBioUpdate} from '../../redux/Actions/AuthActions';
import {ShowToast} from '../../GlobalFunctions/ShowToast';
import {CreateProfile} from '../../GlobalFunctions/Apis';

const Bio = ({navigation, route}) => {
  const validator = require('validator');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useSelector(state => state?.user);
  const dispatch = useDispatch();
  console.log('route.params', route.params);
  console.log({...route.params, bio});
  // const {profileCreated, userData} = useSelector(state => state?.user);
  const [postalAdd, setPostalAdd] = useState('');
  const {imageName, imageUrl, name, userId, gender} = route?.params;
  const addBioSection = () => {
    // if (validator.isEmpty(bio)) {
    //     Message('Bio is required!', 'Please enter your Bio.');
    //     return false;
    // }
    // if (bio?.length < 3) {
    //     Message('Bio is not valid!', 'Bio can only contains letters, minimum 3 letters are required.');
    //     return false;
    // }
    // dispatch(handleBioUpdate(bio, navigation, route.params?.customerID));

    navigation.navigate('AddLocation', {...route?.params, bio});
  };
  const savedId = userData._id;
  const finalId = userId || savedId;

  const addUserLocation = async () => {
    // getDeviceInfo();
    if (validator.isEmpty(postalAdd)) {
      Message(
        'Postal address is required!',
        'Please enter your postal address.',
      );
      return false;
    }
    // dispatch(handleLocation(postalAdd, navigation, route.params?.customerID, deviceInfo));
    setIsLoading(true);
    const response = await CreateProfile({
      userId: finalId,
      name,
      gender,
      // lat,
      // long: lng,
      // locName: address,
      userImage: imageUrl,
      bio,
      postalCode: postalAdd,
      dispatch,
      navigation,
    });
    setIsLoading(false);

    if (response.success) {
      ShowToast('success', 'Profile Created Successfully');
      navigation.navigate('Home');
    }
    // navigation.navigate('Final', {
    //   title: 'All Set',
    //   msg: 'Welcome to the Sipline',
    // });
  };
  return (
    <>
      <AuthLayout navigation={navigation}>
        <Wrapper>
          <Br space={3} />
          <H4 bold style={{textAlign: 'center'}}>
            Add Bio
          </H4>
          <Br space={3} />
          <Input
            multiline
            numberOfLines={10}
            placeholder="Bio"
            onChangeText={text => setBio(text)}
          />
          <Br space={2} />
          <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
            Postal Code
          </Pera>
          <Input
            onChangeText={text => {
              setPostalAdd(text);
            }}
            keyboardType="numeric"
            placeholder="12345670"
          />
        </Wrapper>
      </AuthLayout>
      <Btn
        // loading={loader}
        // onPress={addBioSection}
        loading={isLoading}
        onPress={() => addUserLocation()}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: hp('3%'),
          width: wp('88%'),
          alignSelf: 'center',
        }}>
        Next
      </Btn>
    </>
  );
};

export default Bio;
