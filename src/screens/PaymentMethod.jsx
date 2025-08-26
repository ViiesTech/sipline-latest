/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ActivityIndicator, View} from 'react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Wrapper from '../utils/Wrapper';
import Btn from '../components/Btn';
import CustomCarousel from '../components/ImageCarousel';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {handleCards} from '../redux/Actions/BarActions';
import {LoadingAnimation} from '../utils/Alert';
import {myCartDummyData} from '../utils/LocalData';
import {getPaymentCards} from '../GlobalFunctions/Apis';
import {Pera} from '../utils/Text';
import {responsiveFontSize, responsiveHeight} from '../utils/Responsive';
import {ShowToast} from '../GlobalFunctions/ShowToast';
import { useIsFocused } from '@react-navigation/core';

const PaymentMethod = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {payCreateCustomerId} = useSelector(state => state.user.userData);
  const getCardsData = myCartDummyData;
  const [isLoading, setIsLoading] = useState(false);
  const [allCards, setAllCards] = useState([]);
  console.log('allCards', allCards);
  const focus = useIsFocused();

  const getCardsHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getPaymentCards(payCreateCustomerId);
      setIsLoading(false);
      setAllCards(response);
    } catch (error) {
      setIsLoading(false);
      return ShowToast('error', `Cards ${error.response.data}`);
    }
  };
  useEffect(() => {
    getCardsHandler();
  }, [focus]);
  // useEffect(() => {
  //     if (!getCardsData?.userCard?.length) {
  //         setLoader(true);
  //         dispatch(handleCards());
  //     }
  //     dispatch(handleCards());
  //     setTimeout(() => {
  //         setLoader(false);
  //     }, 2000);
  // }, []);

  return (
    <>
      {loader ? (
        <Background>
          <LoadingAnimation />
        </Background>
      ) : (
        <>
          <Background>
            <Wrapper>
              <Header
                navigation={navigation}
                onlyTitle
                title={'Payment Method'}
                withBack
              />
              <Br space={5} />

              <View style={{alignItems: 'flex-end'}}>
                <Btn
                  onPress={() => navigation.navigate('AddCard')}
                  style={{width: wp('45%')}}>
                  Add New Card
                </Btn>
              </View>
              <Br space={2} />
              <View>
                {isLoading ? (
                  <View
                    style={{
                      height: responsiveHeight(34),
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size={45} color={'#000'} />
                  </View>
                ) : allCards?.length > 0 ? (
                  <CustomCarousel
                    pressable={false}
                    data={allCards}
                    params={route?.params}
                  />
                ) : (
                  <Pera
                    style={{
                      textAlign: 'center',
                      fontSize: responsiveFontSize(2.8),
                      marginTop: responsiveHeight(10),
                    }}>
                    No Cards Added
                  </Pera>
                )}
              </View>

              <Br space={2} />
              {/* {allCards?.length > 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <Btn
                    onPress={() =>
                      navigation.navigate('DeleteCard', {
                        title: 'Card',
                        msg: 'Are you sure you want to delete this card',
                        noThanks: 'No Thanks',
                        nav: 'goBack',
                        deleteCard: 'Delete Card',
                      })
                    }
                    style={{width: wp('45%')}}>
                    Delete Card
                  </Btn>
                </View>
              ) : null} */}
            </Wrapper>
          </Background>
        </>
      )}
    </>
  );
};

export default PaymentMethod;
