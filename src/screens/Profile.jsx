/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Background from '../utils/Background';
import Header from '../components/Header';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Br from '../components/Br';
import Wrapper from '../utils/Wrapper';
import {ArrowCircleRight2, Edit} from 'iconsax-react-native';
import {Color} from '../utils/Colors';
import {H4, Pera} from '../utils/Text';
import Input from '../components/Input';
import NavigationBar from '../components/NavigationBar';
import ProfileImage from '../components/ProfileImageAvatr';
import {useSelector} from 'react-redux';
import {baseUrl, imageUrl} from '../utils/Api_contents';

const Profile = ({navigation}) => {
  const {userData} = useSelector(state => state?.user);
  console.log(userData);
  return (
    <>
      <Background>
        <Wrapper>
          <Header navigation={navigation} onlyTitle title="Profile">
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Edit size={hp('2.5%')} color={Color('text')} variant="Bold" />
            </TouchableOpacity>
          </Header>
          <Br space={4} />
          <ProfileImage
            onpress={() => navigation.navigate('EditProfile')}
            imgUrl={`${imageUrl}${userData?.profileImage}`}
          />
          <Br space={1.5} />
          <H4 style={{textAlign: 'center'}} bold>
            {userData?.fullName?.replace(/\b\w/g, l => l.toUpperCase())}
          </H4>
          <Pera style={{textAlign: 'center'}}>{userData?.email}</Pera>
          <Br space={2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Home"
            actAsButton
            onPress={() => navigation.goBack()}
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="My Orders"
            onPress={() => {
              navigation.navigate('MyOrdersList');
            }}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="My Cart"
            actAsButton
            onPress={() => navigation.navigate('MyCart')}
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Payment"
            onPress={() => navigation.navigate('PaymentMethod')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Wishlist"
            onPress={() => navigation.navigate('WishList')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Discount Coupons"
            onPress={() => navigation.navigate('DiscountCoupons')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Return Policy"
            onPress={() => navigation.navigate('Return')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Privacy"
            onPress={() => navigation.navigate('PrivacyPolicy')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Term & Conditions"
            onPress={() => navigation.navigate('Terms')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            inputStyle={{fontSize: wp('4%')}}
            styling={styles.inputStyle}
            value="Contact Support"
            onPress={() => navigation.navigate('Support')}
            actAsButton
          />
          <Br space={1.2} />
          <Input
            onPress={() => {
              navigation.navigate('Logout');
            }}
            value="Logout"
            actAsButton
            leftIcon={
              <ArrowCircleRight2
                size={wp('7%')}
                color={Color('text')}
                variant="Bold"
              />
            }
            styling={styles.inputStyle}
            inputStyle={{fontSize: wp('4%'), marginLeft: 2}}
          />
          <Br space={13} />
        </Wrapper>
      </Background>
      <NavigationBar />
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: Color('inputIcons'),
    borderRadius: 10,
    backgroundColor: Color('headerIcon'),
  },
});

export default Profile;
