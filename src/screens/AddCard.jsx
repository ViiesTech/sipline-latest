/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, View} from 'react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import {Pera} from '../utils/Text';
import Input from '../components/Input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../components/Btn';
import {useDispatch} from 'react-redux';
import {handleAddCard} from '../redux/Actions/BarActions';
import {Message} from '../utils/Alert';
import {useState} from 'react';

const AddCard = ({navigation}) => {
  const validator = require('validator');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [card, setCard] = useState({
    card_number: '',
    owner: '',
    expiry: '',
    cvv: '',
  });

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

  const handleCardCall = () => {
    // const checker = isValid();
    // if (checker) {
    //     dispatch(handleAddCard(card,setLoading, navigation));
    //     setLoading(true);
    // }
    navigation.navigate('PaymentMethod');
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
            <Image
              source={require('../assets/images/4.png')}
              resizeMode="contain"
              style={{
                width: hp('40%'),
                height: hp('40%'),
              }}
            />
          </View>
          <Br space={2} />
          <Wrapper>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                  Card Holder
                </Pera>
                <Input
                  value={card?.owner}
                  placeholder="Name"
                  onChangeText={value => setCard({...card, owner: value})}
                  styling={{width: hp('19%')}}
                />
              </View>
              <View>
                <Pera style={{marginBottom: hp('0.5%'), paddingLeft: wp('1%')}}>
                  Card Number
                </Pera>
                <Input
                  styling={{width: hp('19%')}}
                  keyboardType="numeric"
                  value={card?.card_number}
                  placeholder="Card Number"
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
                  styling={{width: hp('19%')}}
                  keyboardType="numeric"
                  value={card?.expiry}
                  placeholder="Expiry"
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
              Add Now
            </Btn>
          </View>
        </Wrapper>
      </Background>
    </>
  );
};

export default AddCard;
