/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ToastAndroid, View} from 'react-native';
import Header from '../components/Header';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import CartComponent from '../components/CartComponents';
import {useEffect, useState} from 'react';
import {H5, Pera} from '../utils/Text';
import Input from '../components/Input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TotalCard from '../components/TotalCard';
import Btn from '../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {
  handleCoupons,
  handleTotalAmount,
  updateCartQuantity,
} from '../redux/Actions/BarActions';
import {myCartDummyData} from '../utils/LocalData';
import {
  clearAdminId,
  setCartProducts,
  setClearProducts,
} from '../reduxNew/Slices';
import {ShowToast} from '../GlobalFunctions/ShowToast';
import {applyCouponCode} from '../GlobalFunctions/Apis';
import {responsiveFontSize, responsiveHeight} from '../utils/Responsive';

const MyCart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.bars);
  const cartData = !!data?.length ? data : myCartDummyData;
  const {cartProducts, adminId} = useSelector(state => state.user);
  console.log('cartProducts===<<>>><<', cartData);
  const [code, setCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const [grandTotal2, setGrandTotal2] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log('cartProducts', cartProducts.length);
  console.log('couponDiscount', couponDiscount);
  //   const subTotalAmount = cartData?.cartItems?.reduce((acc, item) => {
  //     return acc + item.quantity * item.after_price;
  //   }, 0);

  //   useEffect(() => {
  //     if (cartData?.getCoupons) {
  //       let discountAmount = 0;
  //       if (cartData?.getCoupons?.discount_type === 'fixed') {
  //         discountAmount = parseFloat(cartData?.getCoupons?.discount);
  //       } else {
  //         const percentage = parseFloat(cartData?.getCoupons?.discount);
  //         const number = subTotalAmount;
  //         const result = (percentage / 100) * number;
  //         discountAmount = parseFloat(result);
  //       }

  //       setGrandTotal(subTotalAmount - discountAmount);
  //     }
  //   }, [cartData]);

  //   useEffect(() => {
  //     if (subTotalAmount && subTotalAmount > 0) {
  //       setGrandTotal(subTotalAmount);
  //     }
  //   }, [subTotalAmount]);

  //   useEffect(() => {
  //     dispatch(handleTotalAmount());
  //   }, []);

  // const applyCode = async () => {
  //   if (cartProducts[0].adminId !== adminId) {
  //     return ShowToast('error', 'This coupon is not valid for this shop.');
  //   }
  //   if (
  //     code.length !== 0 &&
  //     cartData.cartItems &&
  //     cartData.cartItems?.length > 0
  //   ) {
  //     //   return dispatch(handleCoupons(code, cartData.cartItems[0]?.barId));
  //     setIsLoading(true);
  //     const response = await applyCouponCode(code, dispatch);
  //     console.log('coupon code responnnseee', response);
  //     setIsLoading(false);
  //     setCouponDiscount(response.data.discountPercent);
  //     console.log('response', response);
  //   } else {
  //     setIsLoading(false);

  //     ToastAndroid.show('Please enter coupon code!', ToastAndroid.SHORT);
  //   }
  // };
  const applyCode = async () => {
    if (cartProducts[0].adminId !== adminId) {
      return ShowToast('error', 'This coupon is not valid for this shop.');
    }

    if (
      code.length !== 0 &&
      cartData.cartItems &&
      cartData.cartItems?.length > 0
    ) {
      setIsLoading(true);
      const response = await applyCouponCode(code, dispatch);
      setIsLoading(false);

      if (response?.data) {
        setCouponDiscount(response.data); // store whole object
        ShowToast('success', 'Coupon applied successfully!');
      } else {
        ShowToast('error', 'Invalid coupon code.');
      }
    } else {
      setIsLoading(false);
      ToastAndroid.show('Please enter coupon code!', ToastAndroid.SHORT);
    }
  };

  // useEffect(() => {
  //   if (cartProducts.length > 0) {
  //     const total = cartProducts.reduce((acc, item) => {
  //       const price = Number(item.price) || 0;
  //       const quantity = Number(item.quantity) || 1;
  //       return acc + price * quantity;
  //     }, 0);

  //     setSubTotal(total);

  //     const discountPercent = Number(couponDiscount) || 0;
  //     const discountAmount = (total * discountPercent) / 100;
  //     const afterDiscount = total - discountAmount;

  //     setGrandTotal(afterDiscount);

  //     const salesTax = afterDiscount * 0.015;
  //     const performanceCharge = 0.99;

  //     const finalAmount = afterDiscount + salesTax + performanceCharge;
  //     setGrandTotal2(finalAmount);

  //     console.log('grandTotal2:', finalAmount);
  //   } else {
  //     setSubTotal(0);
  //     setGrandTotal(0);
  //     setGrandTotal2(0);
  //   }
  // }, [cartProducts, couponDiscount]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      const total = cartProducts.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        return acc + price * quantity;
      }, 0);

      setSubTotal(total);

      // Extract discount info safely
      const discountType = couponDiscount?.discountType;
      const discountValue = Number(couponDiscount?.discountPercent) || 0;

      let afterDiscount = total;

      if (discountType === 'percentage') {
        // Apply percentage discount
        const discountAmount = (total * discountValue) / 100;
        afterDiscount = total - discountAmount;
      } else if (discountType === 'Fixed') {
        // Apply fixed amount discount
        afterDiscount = total - discountValue;
      }

      // Prevent negative totals
      if (afterDiscount < 0) afterDiscount = 0;

      setGrandTotal(afterDiscount);

      // Add tax + service charge
      const salesTax = afterDiscount * 0.015;
      const performanceCharge = 0.99;
      const finalAmount = afterDiscount + salesTax + performanceCharge;

      setGrandTotal2(finalAmount);

      console.log('grandTotal2:', finalAmount);
    } else {
      setSubTotal(0);
      setGrandTotal(0);
      setGrandTotal2(0);
    }
  }, [cartProducts, couponDiscount]);

  const handleIncrease = productId => {
    const updatedCart = cartProducts.map(item => {
      console.log('stockquantity', item);

      if (item._id === productId && item.quantity < item.StockQuantity) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    dispatch(setCartProducts(updatedCart));
  };

  const handleDecrease = productId => {
    const updatedCart = cartProducts.map(item => {
      if (item._id === productId && item.quantity > 1) {
        console.log('item.quantity', item.quantity);
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    dispatch(setCartProducts(updatedCart));
  };

  return (
    <Background>
      <Wrapper>
        <Header navigation={navigation} onlyTitle title={'My Cart'} withBack />
        <Br space={5} />
        <View>
          {cartProducts?.length === 0 ? (
            <View
              style={{
                height: responsiveHeight(70),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pera
                extraBold
                style={{
                  textAlign: 'center',
                  fontSize: responsiveFontSize(3),
                  fontWeight: '700',
                }}>
                Cart is Empty!
              </Pera>
            </View>
          ) : (
            <View>
              <>
                {cartProducts?.map((item, index) => {
                  // const imagPath =
                  //   item.productImages.length === 0
                  //     ? item?.productImages
                  //     : item.productImages[0].replace(/[\[\]']+/g, '');
                  return (
                    <CartComponent
                      id={item?._id}
                      countNumber={item?.quantity}
                      onAdd={() => handleIncrease(item._id)}
                      onDetect={() => handleDecrease(item._id)}
                      key={index}
                      ImgUrl={`${imageUrl}${item.productImages[0]}`}
                      itemPrice={item?.price}
                      itemTitle={item?.name}
                    />
                  );
                })}
              </>
              {cartProducts.length > 1 && (
                <View style={{alignItems: 'flex-end'}}>
                  <Btn
                    disabled={cartProducts.length === 0 || grandTotal === 0}
                    onPress={() => {
                      dispatch(setClearProducts());
                      dispatch(clearAdminId());
                    }}
                    style={{width: wp('45%')}}>
                    Clear Products
                  </Btn>
                </View>
              )}

              <H5 bold>Coupon Code</H5>
              <Br space={2} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: hp('2%'),
                }}>
                <Input
                  placeholder={'Place coupons here...'}
                  styling={{borderRadius: hp('1%'), width: wp('65%')}}
                  onChangeText={text => setCode(text)}
                />
                <Btn loading={isLoading} loaderSize="small" onPress={applyCode}>
                  {' '}
                  Apply
                </Btn>
              </View>
              <Br space={2} />
              <H5 bold>Order Summary</H5>
              <TotalCard
                beforeTotal={[
                  {
                    label: 'Sub Total',
                    value: `$${parseFloat(subTotal).toFixed(2)}/-`,
                  },
                  {label: '', value: '', line: true},
                  // {
                  //   label: 'Applied Coupon',
                  //   value: couponDiscount ? `${couponDiscount}%` : '/-',
                  // },
                  {
                    label: 'Applied Coupon',
                    value: couponDiscount
                      ? couponDiscount.discountType === 'Fixed'
                        ? `$${parseFloat(
                            couponDiscount.discountPercent,
                          ).toFixed(2)}/-`
                        : `${couponDiscount.discountPercent}%`
                      : '/-',
                  },
                  {label: '', value: '', line: true},
                  {
                    label: 'Grand Total',
                    value: grandTotal
                      ? `$${parseFloat(grandTotal).toFixed(2)}/-`
                      : '/-',
                  },
                ]}
              />
              <Br space={3} />
              <View style={{alignItems: 'flex-end'}}>
                <Btn
                  disabled={cartProducts.length === 0 || grandTotal === 0}
                  onPress={() => {
                    navigation.navigate('Checkout', {
                      barId: 'route?.params?.barId',
                      couponId: 'cartData?.getCoupons?.id',
                      grandTotal: grandTotal2,
                      coupon: couponDiscount?.discountPercent,
                      subTotalAmount: subTotal,
                      discountType:couponDiscount?.discountType,
                    });
                  }}
                  style={{width: wp('45%')}}>
                  Checkout
                </Btn>
              </View>
            </View>
          )}
        </View>
      </Wrapper>
      <Br space={5} />
    </Background>
  );
};

export default MyCart;
