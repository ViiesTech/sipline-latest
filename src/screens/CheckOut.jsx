/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, View} from 'react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import {H4, H5, H6, Pera} from '../utils/Text';
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
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {handleCreateOrder} from '../redux/Actions/BarActions';
import {myCartDummyData} from '../utils/LocalData';
import {placeOrder} from '../GlobalFunctions/Apis';
import moment from 'moment';

const Checkout = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {cartProducts, userData, adminId, isLoading} = useSelector(
    state => state.user,
  );
  const date = new Date();
  const formattedDate = moment(date).format('DD-MM-YYYY');
  console.log('formatted date', formattedDate);
  console.log('adminId', adminId);
  const dispatch = useDispatch();
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
  console.log('shopid', shopId);
  const productsForAPI = cartProducts.map(item => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  console.log('productsForAPI:', productsForAPI);
  const handleOrder = async () => {
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
      dispatch,
    );
    // navigation.navigate('OrderPreparing', {data: response.data,showOrderCard:false});
    navigation.navigate('Home');
  };
  return (
    <Background>
      <Wrapper>
        <Header navigation={navigation} onlyTitle title={'Checkout'} withBack />
        <Br space={5} />
        <H4>Checkout Confirmation</H4>
        <Br space={3} />
        <View>
          {cartData.cartItems?.length === 0 ? (
            <Pera style={{textAlign: 'center'}}>Cart is Empty!</Pera>
          ) : (
            <>
              {cartProducts?.map((item, index) => {
                console.log('imageurl', `${imageUrl}${item.productImages[0]}`);
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', gap: hp('2%'), alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Color('ratingStar'),
                width: hp('4%'),
                height: hp('4%'),
              }}
            />
            <View>
              <H6 bold>Card Selected</H6>
              <Pera>For the current payment</Pera>
            </View>
          </View>
          <RadioBtn
            radioClr={Color('ratingStar')}
            isChecked={true}
            // onPress={() => setRadioCheck(!radioCheck)}
          />
        </View>
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
            style={{flexDirection: 'row', gap: hp('2%'), alignItems: 'center'}}>
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
              value: route?.params?.coupon ? `${route?.params?.coupon}%` : '/-',
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
            loading={isLoading}
            // onPress={payBill}
            onPress={handleOrder}
            style={{width: wp('45%')}}>
            Pay now
          </Btn>
        </View>
      </Wrapper>
      <Br space={5} />
    </Background>
  );
};

export default Checkout;
