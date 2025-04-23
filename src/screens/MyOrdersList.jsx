/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import SegmentTab from '../components/SegmentTab';
import HorizontalLine from '../utils/HorizontalLine';
import OrderCard from '../components/OrderCard';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { handleOrderHistory } from '../redux/Actions/UsersActions';
import { baseUrl } from '../utils/Api_contents';
import { LoadingAnimation, NoResultFound } from '../utils/Alert';
import { orderHistoryDummyData } from '../utils/LocalData';

const MyOrdersList = ({ navigation }) => {
    const dispatch = useDispatch();
    const orderHistory = useSelector(state => state?.inApp);
    const data = !orderHistory?.allOrderHistory?.length ? orderHistoryDummyData : orderHistory;
    const tabData = ['New', 'Preparing', 'Picked', 'Delivered', 'Rejected'];
    const [selectedValue, setSelectedValue] = useState(tabData[0].toString());

    const getSelectedTabData = (value) => {
        setSelectedValue(value);
        dispatch(handleOrderHistory(value || selectedValue));
    };

    useEffect(() => {
        if (!orderHistory?.allOrderHistory?.length) {
            getSelectedTabData();
        }
    }, []);

    return (
        <Background>
            <Wrapper>
                <Header navigation={navigation} withBack title="Order History" onlyTitle />
            </Wrapper>
            <Br space={4} />
            <View style={{ paddingLeft: wp('3%') }}>
                <SegmentTab
                    options={tabData}
                    selectedVal={selectedValue || tabData[0]}
                    onPress={getSelectedTabData}
                />
            </View>
            <HorizontalLine />
            <Br space={3} />
            {orderHistory?.loadingState ?
                <LoadingAnimation />
                :
                <Wrapper>
                    {data?.allOrderHistory?.length === 0 ?
                        <NoResultFound />
                        :
                        <>
                            {data?.allOrderHistory?.map((item, index) => {
                                const check = index % 2 === 0 ? true : false;
                                return (
                                    <OrderCard
                                        key={index}
                                        // imageUrl={`${baseUrl}/vendor/bars/${item?.tbl_bar?.bar_image}`}
                                        imageUrl={item?.tbl_bar?.bar_image}
                                        itemId={item?.order_id}
                                        itemName={item?.tbl_bar?.bar_name}
                                        itemPrice={item?.grand_total}
                                        onPress={() => navigation.navigate('OrderPreparing', { isPicked: check , data:item})}
                                    />
                                );
                            })}
                        </>
                    }
                </Wrapper>
            }
        </Background>
    );
};


export default MyOrdersList;
