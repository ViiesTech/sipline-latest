/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { TouchableOpacity, View } from 'react-native';
import Br from '../components/Br';
import Header from '../components/Header';
import Background from '../utils/Background';
import { H4, H5, H6, Pera } from '../utils/Text';
import Wrapper from '../utils/Wrapper';
import CartComponent from '../components/CartComponents';
import RadioBtn from '../components/RadioBtn';
import { Color } from '../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ArrowRight2, Wallet2 } from 'iconsax-react-native';
import TotalCard from '../components/TotalCard';
import Btn from '../components/Btn';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../utils/Api_contents';
import { handleCreateOrder } from '../redux/Actions/BarActions';
import { myCartDummyData } from '../utils/LocalData';


const Checkout = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // const cartData = useSelector(state => state?.bars);
    const cartData = myCartDummyData;
    const grandTotal = route?.params?.grandTotal + cartData?.appData?.sales_tax + cartData?.appData?.platform_charges;

    const payBill = () => {
        const products = cartData?.cartItems?.map((item) => {
            return {
                'product_id': item?.productId,
                'variant_id': item?.id,
                'quantity': item?.quantity,
                'after_price': item?.after_price,
            };
        });
        dispatch(handleCreateOrder(
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
        ));
        setLoading(true);
    };

    return (
        <Background>
            <Wrapper>
                <Header navigation={navigation} onlyTitle title={'Checkout'} withBack />
                <Br space={5} />
                <H4>Checkout Confirmation</H4>
                <Br space={3} />
                <View>
                    {cartData.cartItems?.length === 0
                        ?
                        <Pera style={{ textAlign: 'center' }}>Cart is Empty!</Pera>
                        :
                        <>
                            {cartData.cartItems?.map((item, index) => {
                                const imagPath = item.images.length === 0 ? item?.images : item.images.replace(/[\[\]']+/g, '');
                                return (
                                    <CartComponent
                                        isCartCounter={true}
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
                <Br space={1} />
                {/* {cartData?.activeCard && */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: hp('2%'), alignItems: 'center' }}>
                            <View style={{ backgroundColor: Color('ratingStar'), width: hp('4%'), height: hp('4%') }} />
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
                    onPress={() => navigation.navigate('PaymentMethod', { ...route?.params })}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: hp('2%'), alignItems: 'center' }}>
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
                        { label: 'Sub Total', value: `$${parseFloat(route?.params?.grandTotal).toFixed(2)}/-` },
                        { label: 'Coupon Code Discount', value: route?.params?.coupon },
                        { label: 'Sales Tax', value: `$ ${cartData?.appData?.sales_tax.toString() || 211}` },
                        { label: 'Perform Charges', value:  `$ ${cartData?.appData?.platform_charges.toString() || 213}` },
                        { label: '', value: '', line: true },
                        { label: 'Grand Total', value: `$${parseFloat(grandTotal || 212).toFixed(2)}/-` },
                    ]}
                />
                <Br space={5} />
                <View style={{ alignItems: 'flex-end' }}>
                    <Btn
                        loading={loading}
                        // onPress={payBill}
                        onPress={() => navigation.navigate('OrderPreparing')}
                        style={{ width: wp('45%') }}>Pay now</Btn>
                </View>
            </Wrapper>
            <Br space={5} />
        </Background>
    );
};


export default Checkout;
