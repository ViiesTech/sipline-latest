/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import {H3, H4, H5, H6, Pera} from '../utils/Text';
import Wrapper from '../utils/Wrapper';
import CartComponent from '../components/CartComponents';
import RadioBtn from '../components/RadioBtn';
import {Color} from '../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ArrowRight2, Wallet2} from 'iconsax-react-native';
import TotalCard from '../components/TotalCard';
import Btn from '../components/Btn';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {handleCreateOrder} from '../redux/Actions/BarActions';
import {myCartDummyData} from '../utils/LocalData';
import {
  createTransaction,
  getPaymentCards,
  getShopById,
  placeOrder,
} from '../GlobalFunctions/Apis';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomCarousel from '../components/ImageCarousel';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';
import LottieView from 'lottie-react-native';
import {ShowToast} from '../GlobalFunctions/ShowToast';
import {useIsFocused} from '@react-navigation/core';

// import Carousel, {
//   ICarouselInstance,
//   Pagination,
// } from 'react-native-reanimated-carousel';

// const data = [...new Array(6).keys()];
// const width = Dimensions.get('window').width;

const Checkout = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {cartProducts, userData, adminId} = useSelector(state => state.user);
  const date = new Date();
  const formattedDate = moment(date).format('DD-MM-YYYY');
  const [isLoading, setIsLoading] = useState(false);
  console.log('formatted date', formattedDate);
  console.log('adminId', adminId);
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const refRBSheet = useRef();
  const [allCards, setAllCards] = useState([]);
  console.log('route?.params?.coupon', route?.params);
  const focus = useIsFocused();

  const getCardsHandler = async () => {
    try {
      setCardsLoading(true);
      const response = await getPaymentCards(userData.payCreateCustomerId);
      setCardsLoading(false);
      setAllCards(response);
    } catch (error) {
      setCardsLoading(false);
      return ShowToast('error', `Cards ${error.response.data}`);
    }
  };
  useEffect(() => {
    getCardsHandler();
  }, [focus]);
  useEffect(() => {
    if (selectedCard) {
      console.log('Selected card details:', selectedCard);
      // Use for checkout, form filling, etc.
    }
  }, [selectedCard]);
  // const ref = React.useRef < ICarouselInstance > null;
  // const progress = useSharedValue(0);

  // const onPressPagination = (index: number) => {
  //   ref.current?.scrollTo({
  //     /**
  //      * Calculate the difference between the current index and the target index
  //      * to ensure that the carousel scrolls to the nearest index
  //      */
  //     count: index - progress.value,
  //     animated: true,
  //   });
  // };
  // const cartData = useSelector(state => state?.bars);
  const cartData = myCartDummyData;
  // const grandTotal =
  //   route?.params?.grandTotal +
  //   cartData?.appData?.sales_tax +
  //   cartData?.appData?.platform_charges;

  const payBill = () => {
    const products = cartData?.cartItems?.map(item => {
      return {
        product_id: item?.productId,
        variant_id: item?.id,
        quantity: item?.quantity,
        after_price: item?.after_price,
      };
    });
    dispatch(
      handleCreateOrder(
        route?.params?.coupon,
        route?.params?.couponId || null,
        cartData?.cartItems[0]?.barId,
        products,
        cartData?.activeCard,
        route?.params?.subTotalAmount,
        grandTotal,
        cartData?.appData?.sales_tax,
        cartData?.appData?.platform_charges,
        setLoading,
        navigation,
      ),
    );
    setLoading(true);
  };
  console.log('route.params', route.params);
  const {grandTotal, coupon, subTotalAmount} = route?.params;
  const shopId = cartProducts[0]?.shopId;
  const [shopDetails, setShopDetails] = useState();
  const today = new Date().getDay();
  const todayData = shopDetails?.workingDays[today - 1];

  console.log('shopDetails?.workingDays]====', shopDetails);
  const productsForAPI = cartProducts.map(item => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  console.log('coupon:', coupon);
  const handlePayment = async () => {
    const {lastOrder, venueCapacityFull, shopStatus} = shopDetails;
    if (shopStatus === 'Closed' || !todayData || !todayData?.isActive) {
      return ShowToast(
        'error',
        'Shop is currently closed. Please visit later.',
      );
    }
    if (venueCapacityFull) {
      return ShowToast('error', 'Venue is full. Please try again later.');
    }
    if (lastOrder?.length) {
      return ShowToast('error', 'No more orders for today. See you tomorrow!');
    } else if (!selectedCard) {
      return ShowToast(
        'error',
        'Please Select A Payment Method To Proceed Further',
      );
    } else {
      try {
        setPaymentLoading(true);
        const response = await createTransaction(
          grandTotal,
          'USD',
          selectedCard.id,
          'Charge using saved card',
          userData.payCreateCustomerId,
          userData.email,
        );
        setPaymentLoading(false);
        if (response.status === 'Approved') {
          setShowSuccessAnimation(true); // Show animation
          // Wait for animation to complete before placing order
          setTimeout(() => {
            setShowSuccessAnimation(false);
            handleOrder(response.transaction.id); // call your order function
          }, 1500); // 3 seconds or match your animation duration
        } else {
          return ShowToast('error', response?.error_message);
        }
      } catch (error) {
        setPaymentLoading(false);
        ShowToast('error', error.response.data);
        console.log('error', error.response.data);
      }
    }
  };
  const handleOrder = async transactionId => {
    setIsLoading(true);
    const response = await placeOrder(
      userData._id,
      adminId,
      shopId,
      productsForAPI,
      formattedDate,
      subTotalAmount,
      coupon,
      15,
      0.99,
      grandTotal,
      transactionId,
      dispatch,
      navigation,
    );
    setIsLoading(false);

    // navigation.navigate('OrderPreparing', {data: response.data,showOrderCard:false});
  };

  const fetchShopDetails = async () => {
    try {
      const response = await getShopById(shopId);
      setShopDetails(response?.data);
      console.log('responser', response);
    } catch (error) {
      console.log('errroro', error);
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, []);
  return (
    <Background>
      <Wrapper>
        <Header navigation={navigation} onlyTitle title={'Checkout'} withBack />
        {isLoading ? (
          <View
            style={{height: responsiveHeight(80), justifyContent: 'center'}}>
            <ActivityIndicator size={50} color={'#000'} />
          </View>
        ) : (
          <View>
            <Br space={5} />
            <H4>Checkout Confirmation</H4>
            <Br space={3} />
            <View>
              {cartData.cartItems?.length === 0 ? (
                <Pera style={{textAlign: 'center'}}>Cart is Empty!</Pera>
              ) : (
                <>
                  {cartProducts?.map((item, index) => {
                    console.log(
                      'imageurl',
                      `${imageUrl}${item.productImages[0]}`,
                    );
                    // const imagPath =
                    //   item.productImages.length === 0
                    //     ? item?.productImages
                    //     : item.productImages.replace(/[\[\]']+/g, '');
                    return (
                      <CartComponent
                        isCartCounter={true}
                        key={index}
                        ImgUrl={`${imageUrl}${item.productImages[0]}`}
                        itemPrice={item?.price}
                        itemTitle={item?.name}
                      />
                    );
                  })}
                </>
              )}
            </View>
            <Br space={1} />
            {/* {cartData?.activeCard && */}
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: hp('2%'),
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: Color('ratingStar'),
                    width: hp('4%'),
                    height: hp('4%'),
                  }}
                />
                <View>
                  <H6 bold>{selectedCard ? 'Card Selected' : 'Select Card'}</H6>
                  <Pera>For the current payment</Pera>
                </View>
              </View>
              <RadioBtn
                radioClr={Color('ratingStar')}
                isChecked={true}
                onPress={() => refRBSheet.current.open()}
              />
            </TouchableOpacity>
            {/* } */}
            <Br space={2} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentMethod', {...route?.params})
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: hp('2%'),
                  alignItems: 'center',
                }}>
                <Wallet2 size={hp('3%')} color={Color('text')} />
                <Pera>Add credit card or Debit card</Pera>
              </View>
              <ArrowRight2 size={hp('3%')} color={Color('text')} />
            </TouchableOpacity>
            <Br space={2} />
            <H5 bold>Order Summary</H5>
            <Br space={1} />
            <TotalCard
              beforeTotal={[
                {
                  label: 'Sub Total',
                  value: `$${parseFloat(route?.params?.subTotalAmount).toFixed(
                    2,
                  )}/-`,
                },
                {
                  label: 'Coupon Code Discount',
                  value:
                    route?.params?.discountType === 'percentage'
                      ? `${route?.params?.coupon}%`
                      : '/-',
                },
                {
                  label: 'Sales Tax',
                  value: '$ 1.5%',
                },
                {
                  label: 'Perform Charges',
                  value: '$ 0.99/-',
                },
                {label: '', value: '', line: true},
                {
                  label: 'Grand Total',
                  value: `$${parseFloat(grandTotal).toFixed(2)}/-`,
                },
              ]}
            />
            <Br space={5} />
            <View style={{alignItems: 'flex-end'}}>
              <Btn
                loading={paymentLoading}
                // onPress={payBill}
                onPress={handlePayment}
                style={{width: wp('45%')}}>
                Pay now
              </Btn>
            </View>
            <RBSheet
              ref={refRBSheet}
              height={500}
              draggable={true}
              openDuration={500}
              closeDuration={500}
              customStyles={{
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              }}
              enablePanDownToClose={true}>
              <View style={{padding: 16, flex: 1}}>
                {cardsLoading ? (
                  <View style={{flex: 0.8, justifyContent: 'center'}}>
                    <ActivityIndicator size={45} color={'#000'} />
                  </View>
                ) : allCards?.length > 0 ? (
                  <View>
                    <H4 style={{textAlign: 'center', fontWeight: 700}}>
                      Select a Payment Method
                    </H4>
                    <CustomCarousel
                      onCardSelect={setSelectedCard}
                      data={allCards}
                      params={route?.params}
                    />
                  </View>
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
            </RBSheet>
            {showSuccessAnimation && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)', // Optional: semi-transparent backdrop
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 999,
                }}>
                <LottieView
                  source={require('../assets/animations/Payment-Successful.json')}
                  autoPlay
                  loop={false}
                  style={{
                    width: responsiveWidth(100),
                    height: responsiveHeight(100),
                  }}
                />
              </View>
            )}
          </View>
        )}
      </Wrapper>
      <Br space={5} />
    </Background>
  );
};

export default Checkout;
