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
import {setCartProducts} from '../reduxNew/Slices';
import {ShowToast} from '../GlobalFunctions/ShowToast';
import {applyCouponCode} from '../GlobalFunctions/Apis';

const MyCart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.bars);
  const cartData = !!data?.length ? data : myCartDummyData;
  const {cartProducts, adminId, isLoading} = useSelector(state => state.user);
  console.log('cartproducts', cartProducts);
  const [code, setCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState();
  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const [grandTotal2, setGrandTotal2] = useState(0);

  console.log('grandTotal', grandTotal);
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

  const applyCode = async () => {
    if (cartProducts[0].adminId !== adminId) {
      return ShowToast('error', 'This coupon is not valid for this shop.');
    }
    if (
      code.length !== 0 &&
      cartData.cartItems &&
      cartData.cartItems?.length > 0
    ) {
      //   return dispatch(handleCoupons(code, cartData.cartItems[0]?.barId));
      const response = await applyCouponCode(code, dispatch);
      setCouponDiscount(response.data.discountPercent);
      console.log('response', response);
    } else {
      ToastAndroid.show('Please enter coupon code!', ToastAndroid.SHORT);
    }
  };

  //   const coupon = cartData?.getCoupons
  //     ? cartData?.getCoupons?.discount_type === 'fixed'
  //       ? `$${parseFloat(cartData?.getCoupons?.discount).toFixed(2)}/-`
  //       : `${cartData?.getCoupons?.discount}%`
  //     : 0;

  useEffect(() => {
    if (cartProducts.length > 0) {
      const total = cartProducts.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        return acc + item.price * quantity;
      }, 0);

      setSubTotal(total);

      const discountAmount = (total * couponDiscount) / 100;
      const afterDiscount = total - discountAmount;

      setGrandTotal(afterDiscount); // set this normally for display

      const salesTax = afterDiscount * 0.015; // 1.5% sales tax
      const performanceCharge = 0.99; // fixed charge

      const finalAmount = afterDiscount + salesTax + performanceCharge;
      setGrandTotal2(finalAmount); // updated total with charges
      console.log('grandtotal2', grandTotal2);
    } else {
      setSubTotal(0);
      setGrandTotal(0);
      setGrandTotal2(0);
    }
  }, [cartProducts, couponDiscount]);

  const handleIncrease = productId => {
    const updatedCart = cartProducts.map(item => {
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
            <Pera style={{textAlign: 'center'}}>Cart is Empty!</Pera>
          ) : (
            <>
              {cartProducts?.map((item, index) => {
                // const imagPath =
                //   item.productImages.length === 0
                //     ? item?.productImages
                //     : item.productImages[0].replace(/[\[\]']+/g, '');
                return (
                  <CartComponent
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
          )}
        </View>
        <H5 bold>Coupon Code</H5>
        <Br space={2} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: hp('2%')}}>
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
            {
              label: 'Applied Coupon',
              value: couponDiscount ? `${couponDiscount}%` : '/-',
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
                coupon: couponDiscount,
                subTotalAmount: subTotal,
              });
            }}
            style={{width: wp('45%')}}>
            Checkout
          </Btn>
        </View>
      </Wrapper>
      <Br space={5} />
    </Background>
  );
};

export default MyCart;
