/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
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

const PaymentMethod = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  // const getCardsData = useSelector((state) => state.bars);
  const getCardsData = myCartDummyData;

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
                <CustomCarousel
                  data={getCardsData?.userCard}
                  params={route?.params}
                />
              </View>

              <Br space={2} />

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
            </Wrapper>
          </Background>
        </>
      )}
    </>
  );
};

export default PaymentMethod;
