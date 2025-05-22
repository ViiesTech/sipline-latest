/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Star1} from 'iconsax-react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import {H3, H6, Pera} from '../utils/Text';
import Wrapper from '../utils/Wrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TouchableOpacity, View} from 'react-native';
import {Color} from '../utils/Colors';
import Input from '../components/Input';
import Btn from '../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import {HandleFeedback} from '../redux/Actions/UsersActions';
import {addReview} from '../GlobalFunctions/Apis';

const FeedBack = ({navigation, route}) => {
  const dinkQulityValues = ['Great', 'Average', 'Bad'];
  const serviceSpeedValues = ['Very Fast', 'Average', 'Slow', 'Very Slow'];
  const [selectedDrinkQuality, setSelectedDrikQuality] = useState(0);
  const [selectedServicesSpeed, setSelectedServicesSpeed] = useState(0);
  const [remarks, setRemarks] = useState('');
  const dispatch = useDispatch();
  const {userData, isLoading} = useSelector(state => state.user);
  // console.log('Rout', route?.params?.ratingStar,dinkQulityValues[selectedDrinkQuality],serviceSpeedValues[selectedServicesSpeed],remarks);
  const {adminId, ratingStar, shopId} = route.params;
  console.log('adminId', route.params);
  const giveFeedback = async () => {
    // dispatch(
    //     HandleFeedback(
    //     route?.params?.orderID,
    //     route?.params?.barID,
    //     route?.params?.ratingStar,
    //     dinkQulityValues[selectedDrinkQuality],
    //     serviceSpeedValues[selectedServicesSpeed],
    //     remarks
    // ))
    const response = await addReview(
      userData._id,
      'Shop',
      adminId,
      shopId,
      ratingStar,
      dinkQulityValues[selectedDrinkQuality],
      serviceSpeedValues[selectedServicesSpeed],
      remarks,
      dispatch,
    );
    if (response.success) {
      navigation.navigate('Home');
    }
  };

  return (
    <Background>
      <Wrapper>
        <Header onlyTitle title={'Feedback'} />
        <Br space={5} />
        <H3 style={{textAlign: 'center', marginBottom: wp('2%')}} bold>
          Rate Your Experienced
        </H3>
        <Pera style={{textAlign: 'center', marginBottom: wp('8%')}}>
          Are You Satisfied With Our Services
        </Pera>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: wp('5%'),
          }}>
          {[...Array(5).keys()].map((star, index) => (
            <View
              key={index}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Star1
                size={hp('3.5%')}
                color={
                  star + 1 <= route.params?.ratingStar
                    ? Color('starClr')
                    : Color('text')
                }
                variant="Bold"
              />
            </View>
          ))}
        </View>
        <Br space={5} />
        <H6 style={{marginBottom: wp('2%')}} bold>
          Drink Quality
        </H6>
        <View
          style={{flexDirection: 'row', gap: hp('1%'), alignItems: 'center'}}>
          {dinkQulityValues.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedDrikQuality(index)}
                style={{
                  borderWidth: wp('0.2%'),
                  width: wp('20%'),
                  height: hp('4%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: hp('2%'),
                  borderColor:
                    index === selectedServicesSpeed
                      ? Color('ratingStar')
                      : Color('mapSearchBorder'),
                  backgroundColor:
                    index === selectedDrinkQuality
                      ? Color('ratingStar')
                      : Color('headerIcon'),
                }}>
                <Pera>{item}</Pera>
              </TouchableOpacity>
            );
          })}
        </View>
        <Br space={3} />
        <H6 style={{marginBottom: wp('2%')}} bold>
          Service Speed
        </H6>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: hp('1%'),
            alignItems: 'center',
          }}>
          {serviceSpeedValues.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedServicesSpeed(index)}
                style={{
                  borderWidth: wp('0.2%'),
                  width: wp('25%'),
                  height: hp('4%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: hp('2%'),
                  borderColor:
                    index === selectedServicesSpeed
                      ? Color('ratingStar')
                      : Color('mapSearchBorder'),
                  backgroundColor:
                    index === selectedServicesSpeed
                      ? Color('ratingStar')
                      : Color('headerIcon'),
                }}>
                <Pera>{item}</Pera>
              </TouchableOpacity>
            );
          })}
        </View>
        <Br space={3} />
        <H6 style={{marginBottom: wp('2%')}} bold>
          Overall satisfaction
        </H6>
        <Input
          multiline
          numberOfLines={10}
          placeholder="Write here"
          styling={{
            borderRadius: hp('1.5%'),
            borderColor: Color('mapSearchBorder'),
          }}
          onChangeText={text => setRemarks(text)}
        />
        <Br space={2} />
        <Btn
          loading={isLoading}
          onPress={giveFeedback}
          style={{width: wp('50%'), alignSelf: 'flex-end'}}>
          Submit
        </Btn>
      </Wrapper>
    </Background>
  );
};

export default FeedBack;
