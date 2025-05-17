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
import {getOrderHistory} from '../GlobalFunctions/Apis';

const MyOrdersList = ({navigation}) => {
  const dispatch = useDispatch();
  const orderHistory = useSelector(state => state?.inApp);
  const {userData} = useSelector(state => state?.user);
  //   const data = !orderHistory?.allOrderHistory?.length
  //     ? orderHistoryDummyData
  //     : orderHistory;
  const [data, setData] = useState([]);
  const tabData = ['New', 'Preparing', 'Picked', 'Delivered', 'Rejected'];
  const [selectedValue, setSelectedValue] = useState(tabData[0].toString());
  console.log('userData', userData._id);
  console.log('selectedValue', selectedValue);
  const getSelectedTabData = value => {
    setSelectedValue(value);
    // dispatch(handleOrderHistory(value || selectedValue));
  };

  const renderOrderHistory = async () => {
    const response = await getOrderHistory(userData._id, selectedValue);
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
          title="Order History"
          onlyTitle
        />
      </Wrapper>
      <Br space={4} />
      <View style={{paddingLeft: wp('3%')}}>
        <SegmentTab
          options={tabData}
          selectedVal={selectedValue || tabData[0]}
          onPress={getSelectedTabData}
        />
      </View>
      <HorizontalLine />
      <Br space={3} />
      {orderHistory?.loadingState ? (
        <LoadingAnimation />
      ) : (
        <Wrapper>
          {data?.allOrderHistory?.length === 0 ? (
            <NoResultFound />
          ) : (
            <>
              {data?.map((item, index) => {
                // const check = index % 2 === 0 ? true : false;
                return (
                  <OrderCard
                    key={index}
                    // imageUrl={`${baseUrl}/vendor/bars/${item?.tbl_bar?.bar_image}`}
                    imageUrl={{uri: `${imageUrl}${item.productImage}`}}
                    itemId={item?.order_id}
                    itemName={item?.bar_name}
                    itemPrice={item?.grand_total}
                    onPress={() =>
                      navigation.navigate('OrderPreparing', {
                        // isPicked: check,
                        data: item,
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
