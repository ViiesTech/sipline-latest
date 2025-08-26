/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import {H4, Pera} from '../../utils/Text';
import Input from '../../components/Input';
import {Add, User} from 'iconsax-react-native';
import {Color} from '../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Message} from '../../utils/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {handleProfile} from '../../redux/Actions/AuthActions';

const SetProfilePic = ({navigation, route}) => {
  const validator = require('validator');
  const loader = useSelector(state => state?.auth?.loadingState);
  const {token, userData} = useSelector(state => state?.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    imageName: '',
    imageUrl: '',
    name: '',
    base64Img: '',
  });
  const id = route?.params?.userId;
  const savedId = useSelector(state => state.user.userData.id);
  const userId = id || savedId;
  console.log('id', userId);
  const uploadProfileImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    });

    if (result?.assets) {
      setUserInfo({
        ...userInfo,
        imageUrl: result.assets[0].uri,
        // base64Img: result.assets[0].base64,
        imageName: result.assets[0].fileName,
      });
    }
  };

  const clickProfileImage = async () => {
    const result = await launchCamera({
      cameraType: 'back',
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    });
    if (result?.assets) {
      setUserInfo({
        ...userInfo,
        imageUrl: result.assets[0].uri,
        // base64Img: result.assets[0].base64,
        imageName: result.assets[0].fileName,
      });
    }
  };

  // const validation = () => {
  //   if (validator.isEmpty(userInfo.name)) {
  //     Message('First Name is required!', 'Please enter your first name.');
  //     return false;
  //   }
  //   if (
  //     !validator.isAlpha(userInfo.name.replace(' ', '')) ||
  //     userInfo.name?.length < 3
  //   ) {
  //     Message(
  //       'First Name is not valid!',
  //       'Name can only contains letters, minimum 3 letters are required.',
  //     );
  //     return false;
  //   }
  //   if (validator.isEmpty(dob)) {
  //     Message('DOB is required!', 'Please enter your Date of Birth');
  //     return false;
  //   }
  //   return true;
  // };

  const handleSetProfile = () => {
    // const checkValidation = validation();
    // if (checkValidation) {
    //     return dispatch(handleProfile(userInfo, navigation, dob, route.params?.customerID));
    // }
    navigation.navigate('SelectGender', {...userInfo, userId});
  };

  const ProfileImage = () => {
    return (
      <View
        style={{
          position: 'relative',
          width: wp('30%'),
          height: wp('30%'),
          alignSelf: 'center',
        }}>
        <Image
          source={{
            uri: userInfo.imageUrl
              ? userInfo.imageUrl
              : 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png',
          }}
          style={{
            width: wp('30%'),
            height: wp('30%'),
            borderRadius: wp('100%'),
            borderWidth: 1,
            borderColor: Color('text'),
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Select an Option',
              'Do you want to upload an image or click one from the camera?',
              [
                {text: 'Cancel'},
                {text: 'Camera', onPress: () => clickProfileImage()},
                {text: 'Upload', onPress: () => uploadProfileImage()},
              ],
            );
          }}
          style={{
            backgroundColor: Color('headerIcon'),
            position: 'absolute',
            bottom: hp('1%'),
            right: 0,
            borderRadius: 50,
            shadowColor: Color('text'),
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: wp('1%'),
          }}>
          <Add size={hp('3%')} color={Color('text')} variant="Outline" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <AuthLayout navigation={navigation}>
        <Wrapper>
          <Br space={3} />
          <H4 bold style={{textAlign: 'center'}}>
            Set Profile Pic
          </H4>
          <Br space={3} />
          <ProfileImage />
          <Br space={3} />
          <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
            Full Name
          </Pera>
          <Input
            leftIcon={<User size={hp('3%')} color={Color('inputIcons')} />}
            styling={{marginBottom: hp('2%')}}
            onChangeText={text => {
              setUserInfo({...userInfo, name: text});
            }}
            placeholder={'Full Name'}
          />
        </Wrapper>
      </AuthLayout>
      <Btn
        loading={loader}
        onPress={handleSetProfile}
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

export default SetProfilePic;
