/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Profile2User, TickCircle, User} from 'iconsax-react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Input from '../components/Input';
import ProfileImage from '../components/ProfileImageAvatr';
import Background from '../utils/Background';
import {H3, Pera} from '../utils/Text';
import Wrapper from '../utils/Wrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import DOB from '../components/DOB';
import Btn from '../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Message} from '../utils/Alert';
import {handleProfileUpdate} from '../redux/Actions/UsersActions';
import {TouchableOpacity, View} from 'react-native';
import {CreateProfile} from '../GlobalFunctions/Apis';
import { setLoading } from '../reduxNew/Slices';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth?.permission?.allUserData);
  const userDetails = useSelector(state => state?.user?.userData);
  const loading = useSelector(state => state?.user?.isLoading);
  const userId = userDetails._id;
  const [dob, setDob] = useState(userData?.date_of_birth?.toString());
  const [profile, setProfile] = useState({
    full_name: userData?.full_name,
    bio: userData?.bio,
    gender: userData?.gender,
    image_name: '',
    // profile_image: '',
    profile_imageUrl: '',
  });
  console.log('profle', profile);
  const uploadProfileImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    });

    if (result?.assets) {
      setProfile({
        ...profile,
        profile_imageUrl: result.assets[0].uri,
        // profile_image: result.assets[0].base64,
        image_name: result.assets[0].fileName,
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
      setProfile({
        ...profile,
        profile_imageUrl: result.assets[0].uri,
        profile_image: result.assets[0].base64,
        image_name: result.assets[0].fileName,
      });
    }
  };

  const updateProfile = async () => {
    // dispatch(handleProfileUpdate(profile, dob));
    await CreateProfile({
      userId: userId,
      name: profile.full_name,
      dob: profile.date_of_birth,
      gender: profile.gender,
      userImage: profile.profile_imageUrl,
      bio: profile.bio,
      dispatch,
      navigation,
    });
  };

  const Selected = () => {
    return (
      <TickCircle
        size={hp('2.5%')}
        color={Color('headerIconBg')}
        variant="Bold"
        style={{position: 'absolute', bottom: 5, right: 5}}
      />
    );
  };

  const genderSelectBox = {
    backgroundColor: Color('headerIcon'),
    borderWidth: 1,
    borderColor: Color('text'),
    padding: hp('4%'),
    borderRadius: 10,
    position: 'relative',
  };

  return (
    <Background>
      <Wrapper>
        <Header onlyBack navigation={navigation} />
        <Br space={4} />
        <H3 style={{textAlign: 'center'}} bold>
          Edit Profile
        </H3>
        <Br space={3} />
        <ProfileImage
          onpress={() => {
            Message(
              'Select an Option',
              'Do you want to upload an image or click one from the camera?',
              [
                {text: 'Cancel'},
                {text: 'Camera', onPress: () => clickProfileImage()},
                {text: 'Upload', onPress: () => uploadProfileImage()},
              ],
            );
          }}
          imgUrl={
            profile?.profile_imageUrl ||
            `${imageUrl}${userDetails?.profileImage}`
          }
        />
        <Br space={3} />
        <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
          Full Name
        </Pera>
        <Input
          leftIcon={
            <User
              size={hp('3%')}
              color={Color('inputIcons')}
              variant="Outline"
            />
          }
          defaultValue={profile?.full_name}
          value={profile?.full_name}
          onChangeText={value => setProfile({...profile, full_name: value})}
          isDefaultFocused
        />
        <Br space={1.5} />
        <Input
          multiline
          placeholder="Bio"
          numberOfLines={10}
          defaultValue={profile?.bio}
          value={profile?.bio}
          onChangeText={value => setProfile({...profile, bio: value})}
          isDefaultFocused
        />
        <Br space={1.5} />
        <DOB dob={dob} setDob={setDob} />
        <Br space={1.5} />
        <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
          Gender
        </Pera>

        <View style={{flexDirection: 'row', gap: 20, justifyContent: 'center'}}>
          <View>
            <TouchableOpacity
              onPress={() => setProfile({...profile, gender: 'male'})}
              style={genderSelectBox}>
              {profile?.gender === 'male' && <Selected />}
              <User size={hp('4%')} color={Color('text')} />
            </TouchableOpacity>
            <Pera style={{textAlign: 'center', marginTop: hp('1.5%')}}>
              Male
            </Pera>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setProfile({...profile, gender: 'female'})}
              style={genderSelectBox}>
              {profile?.gender === 'female' && <Selected />}
              <Profile2User size={hp('4%')} color={Color('text')} />
            </TouchableOpacity>
            <Pera style={{textAlign: 'center', marginTop: hp('1.5%')}}>
              Female
            </Pera>
          </View>
        </View>
        <Br space={3} />
        <Btn loading={loading} onPress={updateProfile}>
          Update
        </Btn>
        <Br space={3} />
      </Wrapper>
    </Background>
  );
};

export default EditProfile;
