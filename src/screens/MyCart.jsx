/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { ToastAndroid, View } from 'react-native';
import Header from '../components/Header';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import CartComponent from '../components/CartComponents';
import { useEffect, useState } from 'react';
import { H5, Pera } from '../utils/Text';
import Input from '../components/Input';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TotalCard from '../components/TotalCard';
import Btn from '../components/Btn';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../utils/Api_contents';
import { handleCoupons, handleTotalAmount, updateCartQuantity } from '../redux/Actions/BarActions';
import { myCartDummyData } from '../utils/LocalData';


const MyCart = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state?.bars);
    const cartData = !!data?.length ? data : myCartDummyData
    const [code, setCode] = useState('');
    const [grandTotal, setGrandTotal] = useState(0);
    const subTotalAmount = cartData?.cartItems?.reduce((acc, item) => {
        return acc + (item.quantity * item.after_price);
    }, 0);

    useEffect(() => {
        if (cartData?.getCoupons) {
            let discountAmount = 0;
            if (cartData?.getCoupons?.discount_type === 'fixed') {
                discountAmount = parseFloat(cartData?.getCoupons?.discount);
            }else {
                const percentage = parseFloat(cartData?.getCoupons?.discount);
                const number = subTotalAmount;
                const result = (percentage / 100) * number;
                discountAmount = parseFloat(result);
            }

            setGrandTotal(subTotalAmount - discountAmount);
        }
    }, [cartData]);

    useEffect(() => {
        if (subTotalAmount && subTotalAmount > 0) {
            setGrandTotal(subTotalAmount);
        }
    }, [subTotalAmount]);

    useEffect(() => {
        dispatch(handleTotalAmount());
    }, []);

    const applyCode = () => {
        if (code.length !== 0 && cartData.cartItems && cartData.cartItems?.length > 0) {
            return dispatch(handleCoupons(code, cartData.cartItems[0]?.barId));
        }
        ToastAndroid.show('Please enter coupon code!', ToastAndroid.SHORT);
    };

    const coupon = cartData?.getCoupons ? (cartData?.getCoupons?.discount_type === 'fixed' ? `$${parseFloat(cartData?.getCoupons?.discount).toFixed(2)}/-` : `${cartData?.getCoupons?.discount}%`) : 0;

    return (
        <Background>
            <Wrapper>
                <Header navigation={navigation} onlyTitle title={'My Cart'} withBack />
                <Br space={5} />
                <View>
                    {cartData.cartItems?.length === 0
                        ?
                        <Pera style={{ textAlign: 'center' }}>Cart is Empty!</Pera>
                        :
                        <>
                            {cartData.cartItems.map((item, index) => {
                                const imagPath = item.images.length === 0 ? item?.images : item.images.replace(/[\[\]']+/g, '');
                                return (
                                    <CartComponent
                                        countNumber={item?.quantity}
                                        onAdd={() => {
                                            if (item?.quantity === item?.maxQuantity) {
                                                ToastAndroid.show('Limited stocks available for now', ToastAndroid.SHORT);
                                            } else {
                                                dispatch(updateCartQuantity(item.id, item.quantity + 1));
                                            }
                                        }
                                        }
                                        onDetect={() => {
                                            if (item?.quantity === 0) {
                                                ToastAndroid.show('Limited stocks available for now!', ToastAndroid.SHORT);
                                            }
                                            else {
                                                dispatch(updateCartQuantity(item.id, item.quantity - 1));
                                            }
                                        }}
                                        key={index}
                                        imgUrl={{ uri: item?.images?.length !== 0 ? `${baseUrl}/customer/products/${imagPath}` : 'https://i.imghippo.com/files/oNqmr1728584671.png' }}
                                        itemPrice={item?.after_price}
                                        itemTitle={item?.name}
                                    />
                                );
                            })}
                        </>
                    }
                </View>
                <H5 bold>Coupon Code</H5>
                <Br space={2} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp('2%') }}>
                    <Input
                        placeholder={'Place coupons here...'}
                        styling={{ borderRadius: hp('1%'), width: wp('65%') }}
                        onChangeText={(text) => setCode(text)}
                    />
                    <Btn onPress={applyCode}> Apply</Btn>
                </View>
                <Br space={2} />
                <H5 bold>Order Summary</H5>
                <TotalCard
                    beforeTotal={[
                        { label: 'Sub Total', value: `$${parseFloat(subTotalAmount).toFixed(2)}/-` },
                        { label: '', value: '', line: true },
                        { label: 'Applied Coupon', value: coupon },
                        { label: '', value: '', line: true },
                        { label: 'Grand Total', value: `$${parseFloat(grandTotal).toFixed(2)}/-` },
                    ]}
                />
                <Br space={3} />
                <View style={{ alignItems: 'flex-end' }}>
                    <Btn
                        disabled={(cartData.cartItems?.length === 0) || (grandTotal === 0)}
                        onPress={() => {
                            navigation.navigate('Checkout', { barId: route?.params?.barId, couponId: cartData?.getCoupons?.id, grandTotal: grandTotal, coupon: coupon, subTotalAmount: subTotalAmount });
                        }}
                        style={{ width: wp('45%') }}>Checkout</Btn>
                </View>
            </Wrapper>
            <Br space={5} />
        </Background>
    );
};


export default MyCart;
