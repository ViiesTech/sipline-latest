import React, {useCallback, useEffect, useState} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import SegmentTab from '../components/SegmentTab';
import HorizontalLine from '../utils/HorizontalLine';
import OrderCard from '../components/OrderCard';
import {DeviceEventEmitter, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../utils/Api_contents';
import {LoadingAnimation, NoResultFound} from '../utils/Alert';
import {getAllOrdersByStatus} from '../GlobalFunctions/Apis';
import {ORDER_HISTORY_REFRESH_EVENT} from '../utils/NotificationEvents';

const ORDER_TABS = [
  'Pending',
  'Preparing',
  'Ready',
  'Picked',
  'Delivered',
  'Rejected',
  'Canceled',
];

const normalizeStatusToTab = status => {
  if (!status || typeof status !== 'string') {
    return null;
  }
  const lower = status.toLowerCase();
  if (lower === 'cancelled') {
    return 'Canceled';
  }
  return ORDER_TABS.find(tab => tab.toLowerCase() === lower) || null;
};

const MyOrdersList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state?.user);
  const [isLoading, setIsLoading] = useState(false);
  console.log(userData._id);
  //   const data = !orderHistory?.allOrderHistory?.length
  //     ? orderHistoryDummyData
  //     : orderHistory;
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(ORDER_TABS[0]);
  // const [data, setData] = useState([]);
  console.log('userData', userData._id);
  console.log('selectedValue', selectedValue);
  const getSelectedTabData = value => {
    setSelectedValue(value);
    // dispatch(handleOrderHistory(value || selectedValue));
  };

  const fetchOrdersByStatus = useCallback(
    async statusOverride => {
      const statusToFetch = statusOverride || selectedValue;
      console.log('selectedvalue', userData._id);
      setIsLoading(true);
      const response = await getAllOrdersByStatus(
        userData._id,
        statusToFetch,
        dispatch,
      );
      setIsLoading(false);
      setData(response?.data?.reverse());
      console.log('response', response);
    },
    [dispatch, selectedValue, userData._id],
  );

  useEffect(() => {
    fetchOrdersByStatus(selectedValue);
  }, [fetchOrdersByStatus, selectedValue]);

  const refreshOrdersRequested = route?.params?.refreshOrders;
  const targetStatus = route?.params?.targetStatus;

  useEffect(() => {
    if (!refreshOrdersRequested) {
      return;
    }
    const normalizedStatus = normalizeStatusToTab(targetStatus);
    if (normalizedStatus && normalizedStatus !== selectedValue) {
      setSelectedValue(normalizedStatus);
    } else {
      fetchOrdersByStatus(normalizedStatus || selectedValue);
    }
    navigation.setParams({refreshOrders: false, targetStatus: undefined});
  }, [
    refreshOrdersRequested,
    targetStatus,
    navigation,
    fetchOrdersByStatus,
    selectedValue,
  ]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      ORDER_HISTORY_REFRESH_EVENT,
      payload => {
        const normalizedStatus = normalizeStatusToTab(payload?.status);
        if (normalizedStatus && normalizedStatus !== selectedValue) {
          setSelectedValue(normalizedStatus);
          return;
        }
        fetchOrdersByStatus(normalizedStatus || selectedValue);
      },
    );

    return () => subscription.remove();
  }, [fetchOrdersByStatus, selectedValue]);
  //   useEffect(() => {
  //     if (!orderHistory?.allOrderHistory?.length) {
  //       getSelectedTabData();
  //     }
  //   }, []);

  console.log('data'  , data);
  return (
    <Background>
      <Wrapper>
        <Header
          navigation={navigation}
          withBack
          title="Orders"
          onlyTitle
        />
      </Wrapper>
      <Br space={4} />
      <View style={{paddingHorizontal: wp('3%')}}>
        <SegmentTab
          options={ORDER_TABS}
          selectedVal={selectedValue || ORDER_TABS[0]}
          onPress={getSelectedTabData}
        />
      </View>
      <HorizontalLine />
      <Br space={3} />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <Wrapper>
          {data?.length === 0 || !data ? (
            <NoResultFound />
          ) : (
            <>
              {data?.map((item, index) => {
                // const check = index % 2 === 0 ? true : false;
                console.log('testing', item);
                const shortOrderId = item?._id?.slice(-5);
                return (
                  <OrderCard
                    key={index}
                    // imageUrl={`${baseUrl}/vendor/bars/${item?.tbl_bar?.bar_image}`}
                    imageUrl={`${imageUrl}${item?.shopId?.shopImage}`}
                    itemId={item?._id}
                    shortId={shortOrderId}
                    itemName={item?.shopId?.barName}
                    itemPrice={item?.grandTotal}
                    onPress={() =>
                      navigation.navigate('OrderPreparing', {
                        // isPicked: check,
                        data: {...item, shortOrderId},
                        showOrderCard: true,
                        status: item.status,
                        createdAt: item?.createdAt,
                      })
                    }
                  />
                );
              })}
            </>
          )}
        </Wrapper>
      )}
    </Background>
  );
};

export default MyOrdersList;
