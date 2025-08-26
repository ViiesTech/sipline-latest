/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import SegmentTab from '../components/SegmentTab';
import HorizontalLine from '../utils/HorizontalLine';
import OrderCard from '../components/OrderCard';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {handleOrderHistory} from '../redux/Actions/UsersActions';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {LoadingAnimation, NoResultFound} from '../utils/Alert';
import {orderHistoryDummyData} from '../utils/LocalData';
import {getAllOrdersByStatus, getOrderHistory} from '../GlobalFunctions/Apis';

const RefundProductSelect = ({navigation}) => {
  const dispatch = useDispatch();
  const orderHistory = useSelector(state => state?.inApp);
  const {userData} = useSelector(state => state?.user);
  console.log(userData._id);
  //   const data = !orderHistory?.allOrderHistory?.length
  //     ? orderHistoryDummyData
  //     : orderHistory;
  const [data, setData] = useState([]);
  const tabData = ['Pending', 'Preparing', 'Picked', 'Delivered', 'Rejected'];
  const [selectedValue, setSelectedValue] = useState(tabData[0].toString());
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState([]);
  console.log('userData', userData._id);
  console.log('data', data);
  const getSelectedTabData = value => {
    setSelectedValue(value);
    // dispatch(handleOrderHistory(value || selectedValue));
  };

  const renderOrderHistory = async () => {
    console.log('selectedvalue', userData._id);
    setIsLoading(true);
    const response = await getAllOrdersByStatus(
      userData._id,
      'Delivered',
      dispatch,
    );
    setIsLoading(false);

    setData(response.data);
    console.log('response', response);
  };
  useEffect(() => {
    renderOrderHistory();
  }, [selectedValue]);
  //   useEffect(() => {
  //     if (!orderHistory?.allOrderHistory?.length) {
  //       getSelectedTabData();
  //     }
  //   }, []);

  return (
    <Background>
      <Wrapper>
        <Header
          navigation={navigation}
          withBack
          title="Refund Order"
          onlyTitle
        />
      </Wrapper>
      <Br space={4} />
      {/* <View style={{paddingLeft: wp('3%')}}>
        <SegmentTab
          options={tabData}
          selectedVal={selectedValue || tabData[0]}
          onPress={getSelectedTabData}
        />
      </View>
      <HorizontalLine /> */}
      <Br space={3} />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <Wrapper>
          {data?.length === 0 ? (
            <NoResultFound />
          ) : (
            <>
              {data?.map((item, index) => {
                // const check = index % 2 === 0 ? true : false;
                console.log('testing', item.status);
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
                      navigation.navigate('RefundProduct', {
                        // isPicked: check,
                        orderId: item?._id,
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

export default RefundProductSelect;
