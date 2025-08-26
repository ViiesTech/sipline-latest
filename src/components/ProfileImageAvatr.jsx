/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Add, Edit} from 'iconsax-react-native';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import {images} from '../assets/images';
import {imageUrl} from '../utils/Api_contents';

const ProfileImage = ({onpress, imgUrl}) => {
  console.log('imgUrl', imgUrl);
  return (
    <View
      style={{
        position: 'relative',
        width: wp('30%'),
        height: wp('30%'),
        alignSelf: 'center',
      }}>
      <Image
        source={
          imgUrl
            ? {
                uri: `${imageUrl}${imgUrl}`,
              }
            : images.userDummy
        }
        style={{
          width: wp('30%'),
          height: wp('30%'),
          borderRadius: hp('100%'),
          borderWidth: 1,
          borderColor: Color('text'),
        }}
      />
      <TouchableOpacity
        onPress={onpress}
        style={{
          backgroundColor: Color('headerIcon'),
          position: 'absolute',
          top: hp('1%'),
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
          padding: wp('1.3%'),
        }}>
        {/* <Add
                    size={hp('3%')}
                    color={Color('text')}
                    variant="Outline"
                /> */}
        <Edit size={hp('2.8%')} color={Color('text')} variant="Bold" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;
