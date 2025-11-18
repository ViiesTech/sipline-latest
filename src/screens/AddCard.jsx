/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import {H3, H4, H5, Pera} from '../utils/Text';
import Input from '../components/Input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import {handleAddCard} from '../redux/Actions/BarActions';
import {Message} from '../utils/Alert';
import {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';
import {addPaymentCard} from '../GlobalFunctions/Apis';
import {ShowToast} from '../GlobalFunctions/ShowToast';

const AddCard = ({navigation}) => {
  const validator = require('validator');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {payCreateCustomerId} = useSelector(state => state.user.userData);
  const [card, setCard] = useState({
    card_number: '',
    owner: '',
    expiry: '',
    cvv: '',
  });
  console.log('card', card);
  const saveExpiry = date => {
    if (date.length >= 2) {
      if (card.expiry.length < 2) {
        setCard({...card, expiry: date + '/'});
      } else {
        if (card.expiry.includes('/')) {
          setCard({...card, expiry: date});
        } else {
          setCard({
            ...card,
            expiry: date.substring(0, 2) + '/' + date.substring(0, 2),
          });
        }
      }
    } else {
      setCard({...card, expiry: date});
    }
  };
  const extractExpiryDetails = expiry => {
    if (!expiry || !expiry.includes('/')) {
      return null;
    }

    const [month, year] = expiry.split('/');

    // Parse and trim leading zero if needed
    const expiryMonth = parseInt(month, 10); // removes leading 0 automatically
    const expiryYear = parseInt(year.length === 2 ? '20' + year : year, 10); // makes 28 into 2028

    return {
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
    };
  };
  const expiryDetails = extractExpiryDetails(card.expiry);
  // const {expiry_month, expiry_year} = expiryDetails;
  console.log(
    'expiry_month expiry_year',
    expiryDetails?.expiry_month,
    expiryDetails?.expiry_year,
  );

  const isValid = () => {
    if (validator.isEmpty(card?.card_number)) {
      Message('Card Number is Required!', 'Please enter your card number.');
      return false;
    }
    if (validator.isEmpty(card?.owner)) {
      Message('Name is Required!', 'Please enter your name on card.');
      return false;
    }
    if (card?.owner?.length < 3) {
      Message(
        'Name is not valid!',
        'Name can only contains letters, minimum 3 letters are required.',
      );
      return false;
    }
    if (validator.isEmpty(card?.expiry)) {
      Message(
        'Card Expiry is Required!',
        'Please enter your card expiry date.',
      );
      return false;
    }
    if (validator.isEmpty(card?.cvv)) {
      Message('Card CVV is Required!', 'Please enter your card cvv.');
      return false;
    }
    return true;
  };

  const handleCardCall = async () => {
    // Basic card validations
    if (!card.owner) {
      return ShowToast('error', 'Please enter the card holder name.');
    } else if (!card.card_number) {
      return ShowToast('error', 'Please enter a 16-digit card number.');
    } else if (
      card.card_number.length !== 16 ||
      !/^\d+$/.test(card.card_number)
    ) {
      return ShowToast('error', 'Card number must be exactly 16 digits.');
    } else if (!card.expiry) {
      return ShowToast('error', 'Please enter card expiry.');
    } else if (!expiryDetails?.expiry_month || !expiryDetails?.expiry_year) {
      return ShowToast('error', 'Invalid expiry format. Please use MM/YY.');
    } else if (!payCreateCustomerId) {
      return ShowToast('error', 'Customer ID not found.');
    }
    setLoading(true);
    try {
      await addPaymentCard(
        'string', // Replace with actual user_id or token if needed
        'string', // Replace with actual business_id or any other identifier
        card.owner.trim(),
        expiryDetails?.expiry_month,
        expiryDetails?.expiry_year,
        card.card_number.trim(),
        payCreateCustomerId,
      );
    } catch (error) {
      console.log('Add Card API Error:', error);
      console.log(payCreateCustomerId)
      // ShowToast('error', 'Something went wrong while adding the card.');
       ShowToast('error', error?.response?.data?.error_details?.error || error?.response?.data?.error_details?.expiry_year[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background>
        <Wrapper>
          <Header
            navigation={navigation}
            onlyTitle
            title={'Add Card'}
            withBack
          />
          <Br space={2} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ImageBackground
              imageStyle={{borderRadius: responsiveHeight(2)}}
              source={require('../assets/images/cardBg.png')}
              // resizeMode="contain"
              style={{
                padding: responsiveHeight(2),
                width: responsiveWidth(90),
                height: responsiveHeight(22),
                justifyContent: 'space-between',
              }}>
              <H4
                style={{
                  marginBottom: hp('0.5%'),
                  fontWeight: 'bold',
                  paddingLeft: wp('1%'),
                }}>
                Debit Card
              </H4>
              <Pera
                style={{
                  marginBottom: hp('0.5%'),
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  paddingLeft: wp('1%'),
                }}>
                XXXX 1998 8723 7001
              </Pera>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Pera
                    style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                    Card Holder
                  </Pera>
                  <Pera
                    style={{
                      marginBottom: hp('0.5%'),
                      fontWeight: '700',
                      paddingLeft: wp('1%'),
                    }}>
                    Babang Riko
                  </Pera>
                </View>
                <View>
                  <Pera
                    style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                    Expiry Date
                  </Pera>
                  <Pera
                    style={{
                      marginBottom: hp('0.5%'),
                      fontWeight: '700',
                      paddingLeft: wp('1%'),
                    }}>
                    02/30
                  </Pera>
                </View>
              </View>
            </ImageBackground>
          </View>
          <Br space={2} />
          <Wrapper>
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                gap: responsiveHeight(2),
                // alignItems: 'center',
              }}>
              <View>
                <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                  Card Holder
                </Pera>
                <Input
                  value={card?.owner}
                  placeholder="Babang Riko"
                  onChangeText={value => setCard({...card, owner: value})}
                  // styling={{width: hp('19%')}}
                />
              </View>
              <View>
                <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                  Card Number
                </Pera>
                <Input
                  maxLength={16}
                  // styling={{width: hp('19%')}}
                  keyboardType="numeric"
                  value={card?.card_number}
                  placeholder="4242 4242 4242 4242"
                  onChangeText={value => setCard({...card, card_number: value})}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp('2%'),
              }}>
              <View>
                <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                  Card Expiry
                </Pera>
                <Input
                  maxLength={5}
                  styling={{width: hp('19%')}}
                  keyboardType="numeric"
                  value={card?.expiry}
                  placeholder="05/29"
                  onChangeText={value => saveExpiry(value)}
                />
              </View>
              <View>
                <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                  Card CVV
                </Pera>
                <Input
                  styling={{width: hp('19%')}}
                  value={card?.cvv}
                  placeholder="CVV"
                  keyboardType="numeric"
                  onChangeText={value => setCard({...card, cvv: value})}
                  secure
                />
              </View>
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: hp('10%'),
            }}>
            <Btn
              loading={loading}
              onPress={handleCardCall}
              style={{width: wp('50%')}}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                'Add Now'
              )}
            </Btn>
          </View>
        </Wrapper>
      </Background>
    </>
  );
};

export default AddCard;
