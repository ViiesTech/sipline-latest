/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import Btn from '../components/Btn';
import Header from '../components/Header';
import OrderProcessorCard from '../components/OrderProcessorCard';
import Models from '../components/Models';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import {TouchableOpacity, View} from 'react-native';
import {H3, Pera} from '../utils/Text';
import {Star1} from 'iconsax-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleOrderStatus} from '../redux/Actions/UsersActions';

const OrderPreparing = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const dispatch = useDispatch();
  const selectedOrderStatus = useSelector(state => state.inApp);
  console.log('route.params', route.params);
  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = refresh => {
    if (refresh) {
      setRefreshing(true);
    }
    dispatch(
      handleOrderStatus(route?.params?.data?.order_id, refresh, setRefreshing),
    );
  };

  const handleRatingChange = newRatings => {
    setCurrentRating(newRatings);
    setModalVisible(false);
    setCurrentRating(0);
    navigation.navigate('Feedback', {
      adminId: route?.params?.data?.adminId,
      ratingStar: newRatings,
    });
  };

  return (
    <>
      <Background onRefresh={() => loadStatus(true)} refreshing={refreshing}>
        <Wrapper>
          <Header
            navigation={navigation}
            onlyTitle
            title={
              selectedOrderStatus?.orderStatus?.status === 'New'
                ? 'New Order'
                : selectedOrderStatus?.orderStatus?.status === 'Picked'
                ? 'Order Picked'
                : selectedOrderStatus?.orderStatus?.status === 'Preparing'
                ? 'Order Preparing'
                : selectedOrderStatus?.orderStatus?.status === 'Delivered'
                ? 'Order Delivered'
                : 'Order Summary'
            }
            withBack
          />
        </Wrapper>
        <OrderProcessorCard
          isPickedUp={
            selectedOrderStatus?.orderStatus?.status === 'New' ? true : false
          }
          // isbuttonShow={(selectedOrderStatus?.orderStatus?.status === "picked") || (selectedOrderStatus?.orderStatus?.status === 'Delivered') ? true : false}
          grandTotal={route?.params?.data?.grandTotal}
          platFormCharges={route?.params?.data?.platFormCharges}
          salesTax={route?.params?.data?.salesTax}
          subTotal={route?.params?.data?.subTotal}
          id={route?.params?.data?._id}
          shortId={route?.params?.data?.shortOrderId}
          //   time={
          //     route?.params?.data?.data
          //       ? route?.params?.data?.data?.tbl_bar?.tbl_cooking_time_range?.to
          //       : ''
          //   }
          orderAddress={'Not Mentioned'}
          coupon={route?.params?.data?.couponDiscount}
          dateTime={route?.params?.data?.date}
        />
      </Background>
      {/* {(selectedOrderStatus?.orderStatus?.status === 'Picked' || selectedOrderStatus?.orderStatus?.status === 'Delivered') && */}
      <Btn
        onPress={() => setModalVisible(true)}
        style={{
          width: wp('50%'),
          zIndex: 1,
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: hp('2%'),
          right: wp('3%'),
        }}>
        Give Feedback
      </Btn>
      {/* } */}
      <Models visible={modalVisible} onClose={setModalVisible}>
        <View
          style={{
            backgroundColor: Color('headerIconBg'),
            padding: wp('12%'),
            borderRadius: 10,
          }}>
          <H3
            style={{textAlign: 'center', marginBottom: hp('1%')}}
            color={Color('headerIcon')}
            bold>
            Rate Your Experience
          </H3>
          <Pera
            color={Color('headerIcon')}
            style={{textAlign: 'center', marginBottom: hp('2%')}}>
            Are You Satisfied with Our Services
          </Pera>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {[...Array(5).keys()].map((star, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRatingChange(star + 1)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Star1
                  size={hp('3.5%')}
                  variant={star + 1 <= currentRating ? 'Bold' : 'Outline'}
                  color={
                    star + 1 <= currentRating
                      ? Color('starClr')
                      : Color('headerIcon')
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Pera
              color={Color('headerIcon')}
              style={{textAlign: 'center', top: hp('2.5%'), fontWeight: '400'}}>
              No Thanks
            </Pera>
          </TouchableOpacity>
        </View>
      </Models>
    </>
  );
};

export default OrderPreparing;
