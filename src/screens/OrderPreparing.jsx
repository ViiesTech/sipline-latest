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
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {H3, Pera} from '../utils/Text';
import {Star1} from 'iconsax-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleOrderStatus} from '../redux/Actions/UsersActions';
import OrderCard from '../components/OrderCard';
import {imageUrl} from '../utils/Api_contents';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import moment from 'moment';
import {updateOrderStatus} from '../GlobalFunctions/Apis';
import {ShowToast} from '../GlobalFunctions/ShowToast';

const OrderPreparing = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [cancelLoading, setCancelLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedOrderStatus = useSelector(state => state.inApp);
  const shortId = route?.params?.data?._id?.slice(-5);
  const {data, showOrderCard, status, createdAt} = route?.params;
  const {_id, refundApplied} = route?.params?.data;
  const isCancel = moment().diff(moment(createdAt), 'minutes') <= 5;
  console.log('route?.params?.data', route?.params?.data);
  console.log('createdAt', createdAt);
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

  const headerStatus = selectedOrderStatus?.orderStatus?.status || status;

  const headerTitle = (() => {
    switch (headerStatus) {
      case 'New':
        return 'New Order';
      case 'Picked':
        return 'Order Picked';
      case 'Preparing':
        return 'Order Preparing';
      case 'Delivered':
        return 'Order Delivered';
      case 'Pending':
        return 'Order Pending';
      case 'Ready':
        return 'Order Ready';
      case 'Canceled':
        return 'Order Canceled';
      case 'Rejected':
        return 'Order Rejected';
      default:
        return headerStatus ? `Order ${headerStatus}` : 'Order Summary';
    }
  })();

  const handleCancelOrder = async () => {
    setCancelLoading(true);
    try {
      const response = await updateOrderStatus(_id);
      setCancelLoading(false);

      if (response?.success) {
        ShowToast('success', 'Order Canceled Successfully');
        navigation.navigate('RefundProduct', {
          // isPicked: check,
          orderId: _id,
        });
      } else {
        ShowToast('error', response?.msg);
      }
      console.log('responnn', response);
    } catch (error) {
      setCancelLoading(false);
      ShowToast('error', error?.response?.data?.msg);
      console.log('error', error);
    }
  };

  const handleRatingChange = newRatings => {
    setCurrentRating(newRatings);
    setModalVisible(false);
    setCurrentRating(0);
    navigation.navigate('Feedback', {
      adminId: route?.params?.data?.adminId,
      shopId: route?.params?.data?.shopId._id,
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
            title={headerTitle}
            withBack
          />
        </Wrapper>
        <OrderProcessorCard
          isPickedUp={
            selectedOrderStatus?.orderStatus?.status === 'New' ? true : false
          }
          isBr={true}
          // isbuttonShow={(selectedOrderStatus?.orderStatus?.status === "picked") || (selectedOrderStatus?.orderStatus?.status === 'Delivered') ? true : false}
          grandTotal={route?.params?.data?.grandTotal}
          platFormCharges={route?.params?.data?.platFormCharges}
          salesTax={route?.params?.data?.salesTax}
          subTotal={route?.params?.data?.subTotal}
          id={route?.params?.data?._id}
          shortId={route?.params?.data?.shortOrderId || shortId}
          shopImage={route?.params?.data?.shopId?.shopImage}
          barName={route?.params?.data?.shopId?.barName}
          createdAt={moment(createdAt).format('hh:mm A')}
          //   time={
          //     route?.params?.data?.data
          //       ? route?.params?.data?.data?.tbl_bar?.tbl_cooking_time_range?.to
          //       : ''
          //   }
          orderAddress={data?.shopId?.barName || 'Not Mentioned'}
          coupon={route?.params?.data?.couponDiscount}
          dateTime={route?.params?.data?.date}
        />
        {showOrderCard ? (
          <FlatList
            data={data?.product}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              padding: responsiveHeight(2),
              // paddingBottom: responsiveHeight(5),
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(5),
            }}
            keyExtractor={(item, index) => `${item?.productId?._id || index}`}
            renderItem={({item, index}) => {
              const shortId2 = item?.productId?._id?.slice(-5);

              return (
                <OrderCard
                  key={index}
                  imageUrl={`${imageUrl}${item?.productId?.productImages[0]}`}
                  itemId={item?.productId._id}
                  shortId={shortId2}
                  itemName={item?.productId?.name}
                  itemPrice={item?.productId?.price}
                />
              );
            }}
          />
        ) : null}
        {/* {!refundApplied ? (
          <View
            style={{alignItems: 'center', marginBottom: responsiveHeight(2)}}>
            <Btn
              onPress={() => {
                navigation.navigate('RefundProduct', {
                  // isPicked: check,
                  orderId: _id,
                });
              }}
              // onPress={handleCancelOrder}
              style={{width: responsiveWidth(90)}}>
              {cancelLoading ? (
                <ActivityIndicator size={'large'} color="white" />
              ) : (
                'Refund Request'
              )}
            </Btn>
          </View>
        ) : null} */}
        {createdAt && isCancel && status === 'Pending' ? (
          <View
            style={{alignItems: 'center', marginBottom: responsiveHeight(2)}}>
            <Btn
              // onPress={() => {
              //   navigation.navigate('RefundProduct', {
              //     // isPicked: check,
              //     orderId: _id,
              //   });
              // }}
              onPress={handleCancelOrder}
              style={{width: responsiveWidth(90)}}>
              {cancelLoading ? (
                <ActivityIndicator size={'large'} color="white" />
              ) : (
                'Cancel Order'
              )}
            </Btn>
          </View>
        ) : !refundApplied && status === 'Canceled' ? (
          <View
            style={{alignItems: 'center', marginBottom: responsiveHeight(2)}}>
            <Btn
              onPress={() => {
                navigation.navigate('RefundProduct', {
                  // isPicked: check,
                  orderId: _id,
                });
              }}
              // onPress={handleCancelOrder}
              style={{width: responsiveWidth(90)}}>
              {cancelLoading ? (
                <ActivityIndicator size={'large'} color="white" />
              ) : (
                'Refund Request'
              )}
            </Btn>
          </View>
        ) : null}
      </Background>
      {/* {(selectedOrderStatus?.orderStatus?.status === 'Picked' || selectedOrderStatus?.orderStatus?.status === 'Delivered') && */}
      {status === 'Delivered' ? (
        <Btn
          onPress={() => setModalVisible(true)}
          style={{
            width: wp('50%'),
            zIndex: 1,
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: hp('1.5%'),
            right: wp('3%'),
          }}>
          Give Feedback
        </Btn>
      ) : null}

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
