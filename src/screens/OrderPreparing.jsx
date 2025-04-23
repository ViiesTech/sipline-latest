/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import Btn from '../components/Btn';
import Header from '../components/Header';
import OrderProcessorCard from '../components/OrderProcessorCard';
import Models from '../components/Models';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import { TouchableOpacity, View } from 'react-native';
import { H3, Pera } from '../utils/Text';
import { Star1 } from 'iconsax-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleOrderStatus } from '../redux/Actions/UsersActions';

const OrderPreparing = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const dispatch = useDispatch();
    const selectedOrderStatus = useSelector((state) => state.inApp);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = (refresh) => {
        if (refresh) {
            setRefreshing(true);
        }
        dispatch(handleOrderStatus(route?.params?.data?.order_id, refresh, setRefreshing));
    };

    const handleRatingChange = (newRatings) => {
        setCurrentRating(newRatings);
        setModalVisible(false);
        setCurrentRating(0);
        navigation.navigate('Feedback', { ratingStar: newRatings, barID: selectedOrderStatus.orderStatus?.tbl_bar?.bar_id, orderID: selectedOrderStatus.orderStatus?.order_id });
    };

    return (
        <>
            <Background onRefresh={() => loadStatus(true)} refreshing={refreshing}>
                <Wrapper>
                    <Header
                        navigation={navigation}
                        onlyTitle
                        title={
                            selectedOrderStatus?.orderStatus?.status === 'new' ? 'New Order' :
                                selectedOrderStatus?.orderStatus?.status === 'picked' ? 'Order Picked' :
                                    selectedOrderStatus?.orderStatus?.status === 'preparing' ? 'Order Preparing' :
                                     selectedOrderStatus?.orderStatus?.status === 'delivered' ? 'Order Delivered' :
                                        'Order Summary'}
                        withBack />
                </Wrapper>
                <OrderProcessorCard
                    isPickedUp={selectedOrderStatus?.orderStatus?.status === 'new' ? true : false}
                    // isbuttonShow={(selectedOrderStatus?.orderStatus?.status === "picked") || (selectedOrderStatus?.orderStatus?.status === 'delivered') ? true : false}
                    grandTotal={route?.params?.data?.grand_total || 43}
                    platFormCharges={route?.params?.data?.platform_charges || 23}
                    salesTax={route?.params?.data?.sales_tax || 32}
                    subTotal={route?.params?.data?.sub_total || 54}
                    id={route?.params?.data?.order_id || 32}
                    time={route?.params?.data ? route?.params?.data?.tbl_bar?.tbl_cooking_time_range?.to : ''}
                    orderAddress={'Not Mentioned'}
                    coupon={route?.params?.data?.coupon || '%10'}
                    dateTime={selectedOrderStatus?.orderStatus?.createdAt}
                />
            </Background>
            {/* {(selectedOrderStatus?.orderStatus?.status === 'picked' || selectedOrderStatus?.orderStatus?.status === 'delivered') && */}
                <Btn
                    onPress={() => setModalVisible(true)}
                    style={{ width: wp('50%'), zIndex: 1, alignSelf: 'flex-end', position: 'absolute', bottom: hp('2%'), right: wp('3%') }}>
                    Give Feedback
                </Btn>
            {/* } */}
            <Models
                visible={modalVisible}
                onClose={setModalVisible}
            >
                <View style={{ backgroundColor: Color('headerIconBg'), padding: wp('12%'), borderRadius: 10 }}>
                    <H3 style={{ textAlign: 'center', marginBottom: hp('1%') }} color={Color('headerIcon')} bold>Rate Your Experience</H3>
                    <Pera color={Color('headerIcon')} style={{ textAlign: 'center', marginBottom: hp('2%') }}>Are You Satisfied with Our Services</Pera>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {[...Array(5).keys()].map((star, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleRatingChange(star + 1)}
                                style={{

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Star1 size={hp('3.5%')} variant={star + 1 <= currentRating ? 'Bold' : 'Outline'} color={star + 1 <= currentRating ? Color('starClr') : Color('headerIcon')} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Pera
                            color={Color('headerIcon')}
                            style={{ textAlign: 'center', top: hp('2.5%'), fontWeight: '400' }}>No Thanks</Pera>
                    </TouchableOpacity>
                </View>
            </Models>
        </>
    );
};



export default OrderPreparing;
