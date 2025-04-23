/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { Add } from 'iconsax-react-native';
import { Image, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';


const ProfileImage = ({onpress,imgUrl}) => {
    
    return (
        <View style={{
            position: 'relative',
            width: wp('30%'),
            height: wp('30%'),
            alignSelf: 'center',
        }}>
            <Image
                source={{ uri: imgUrl || 'https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg' }}
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
                <Add
                    size={hp('3%')}
                    color={Color('text')}
                    variant="Outline"
                />
            </TouchableOpacity>
        </View>
    );
};


export default ProfileImage;
