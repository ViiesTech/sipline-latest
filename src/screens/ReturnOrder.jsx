/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import SvgIcons from '../components/SvgIcons';
import {
  coinshand,
  flipbackward,
  minus,
  review,
  shopping,
  tick,
  truck,
} from '../icons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';
import Btn from '../components/Btn';
import YourDetails from '../components/YourDetails';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReturnReason from '../components/ReturnReason';
import PickupMethod from '../components/PickupMethod';
import PaymentReimbursement from '../components/PaymentReimbursement';
import ReviewReturnOrder from '../components/ReviewReturnOrder';
import {createRefundRequest} from '../GlobalFunctions/Apis';
import {useSelector} from 'react-redux';
import {Color} from '../utils/Colors';

const ReturnOrder = ({route}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {orderId} = route?.params;
  const {_id} = useSelector(state => state.user.userData);
  const [returnDetails, setReturnDetails] = useState({
    selectedCondition: '',
    selectedReason: '',
  });
  const [orderDetails, setOrderDetails] = useState({
    adminId: '',
    orderId: '',
    shopId: '',
    transactionId: '',
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [pickMethod, setPickupMethod] = useState('');
  const [recPaymentMethod, setRecPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refundCreated, setRefundCreated] = useState(false);
  console.log('orderDetails><><><><', orderDetails);
  console.log('pickMethod', pickMethod);
  console.log('recPaymentMethod', recPaymentMethod);
  console.log('selectedItems', selectedItems);
  console.log('returnDetails', returnDetails);
  const data = [
    {
      id: 1,
      iconName: 'shopping-bag',
      title: 'Your details',
      showLine: true,
      iconSet: Feather,
    },
    {
      id: 2,
      iconName: 'arrow-return-left',
      title: 'Reason for Return',
      showLine: true,
      iconSet: Fontisto,
    },
    // {
    //   id: 3,
    //   iconName: 'truck',
    //   title: 'Pickup Method',
    //   showLine: true,
    //   iconSet: Feather,
    // },
    {
      id: 3,
      iconName: 'hand-holding-usd',
      title: 'Payment Reimbursement',
      showLine: true,
      iconSet: FontAwesome5,
    },
    {
      id: 4,
      iconName: 'receipt-outline',
      title: 'Review & Submit',
      showLine: false,
      iconSet: Ionicons,
    },
  ];
  const createRefundHandler = async () => {
    setIsLoading(true);
    try {
      const response = await createRefundRequest(
        _id,
        orderDetails.shopId,
        orderDetails.adminId,
        orderDetails.orderId,
        orderDetails.transactionId,
        selectedItems,
        returnDetails.selectedCondition,
        returnDetails.selectedReason,
        'Standard',
        recPaymentMethod,
      );
      setIsLoading(false);
      if (response.success) {
        setRefundCreated(true);
        setCurrentIndex(5);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
    }
  };

  // const isCurrentStepComplete = () => {
  //   switch (currentIndex) {
  //     case 0: // YourDetails
  //       return selectedItems.length > 0 && orderDetails.orderId;
  //     case 1: // ReturnReason
  //       return returnDetails.selectedCondition && returnDetails.selectedReason;
  //     case 2: // PickupMethod
  //       return pickMethod !== '';
  //     case 3: // PaymentReimbursement
  //       return recPaymentMethod !== '';
  //     case 4: // Review
  //       return true; // or add extra checks if needed
  //     default:
  //       return false;
  //   }
  // };
  const isCurrentStepComplete = () => {
    switch (currentIndex) {
      case 0:
        return selectedItems.length > 0 && orderDetails.orderId;
      case 1:
        return returnDetails.selectedCondition && returnDetails.selectedReason;
      case 2:
        return recPaymentMethod !== '';
      case 3: // Review step
        return false; // Always disabled
      default:
        return false;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: responsiveHeight(2),
        paddingVertical: responsiveHeight(4),
        backgroundColor: '#fff',
        flexGrow: 1,
      }}>
      <Text style={{fontSize: responsiveFontSize(2.8), fontWeight: '600'}}>
        Return my order(s)
      </Text>
      <View>
        <FlatList
          data={data}
          contentContainerStyle={{marginTop: responsiveHeight(3)}}
          renderItem={({item, index}) => {
            const Icon = item.iconSet;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  gap: responsiveHeight(2),
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor:
                        index < currentIndex ? '#2F620B' : '#fff',
                      borderWidth: index < currentIndex ? null : 1.5,
                      padding: responsiveHeight(1.2),
                      borderRadius: responsiveHeight(3.5),
                    }}>
                    {/* <SvgIcons xml={item.iconName} height={25} width={25} /> */}
                    <Icon
                      name={item.iconName}
                      size={25}
                      color={index < currentIndex ? '#fff' : '#000'}
                    />{' '}
                  </View>
                  {item.showLine ? (
                    <View
                      style={{
                        height: responsiveHeight(2),
                        width: responsiveWidth(1),
                        backgroundColor: 'red',
                      }}
                    />
                  ) : null}
                </View>
                <Text
                  style={{
                    color: '#2F620B',
                    fontSize: responsiveFontSize(2),
                    marginTop: responsiveHeight(1.5),
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
      {currentIndex === 0 ? (
        <YourDetails
          orderData={setOrderDetails}
          orderId={orderId}
          onSelectItems={selectedItems => {
            console.log('Selected items:', selectedItems);
            setSelectedItems(selectedItems);
          }}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ) : currentIndex === 1 ? (
        <ReturnReason
          selectedProducts={selectedItems}
          returnDetails={returnDetails}
          setReturnDetails={setReturnDetails}
        />
      ) : currentIndex === 2 ? (
        <PaymentReimbursement
          selectedPaymentMethod={recPaymentMethod}
          setSelectedPaymentMethod={setRecPaymentMethod}
        />
      ) : currentIndex === 3 ? (
        <ReviewReturnOrder
          isLoading={isLoading}
          selectedProducts={selectedItems}
          returnDetails={returnDetails}
          handleSubmitPress={createRefundHandler}
          recPaymentMethod={recPaymentMethod}
        />
      ) : (
        <View
          style={{gap: responsiveHeight(1.3), marginTop: responsiveHeight(4)}}>
          <Text
            style={{
              color: '#101928',
              fontSize: responsiveFontSize(2.2),
              fontWeight: '700',
            }}>
            Your return request has been successfully received.
          </Text>
          <Text style={{color: '#475467', fontSize: responsiveFontSize(2.2)}}>
            We are currently reviewing your request to return your items. You
            can track the progress for updates.
          </Text>
          <Text
            style={{
              color: '#2F620B',
              fontSize: responsiveFontSize(2.2),
              fontWeight: '500',
            }}>
            Track Status: Pending
          </Text>
        </View>
      )}
      ;
      {isLoading || refundCreated ? null : (
        <View
          style={{
            flexDirection: 'row',
            gap: responsiveHeight(2),
            marginTop: responsiveHeight(4),
          }}>
          <Btn
            onPress={() =>
              currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null
            }
            txtSize={2}
            txtColor="#344154"
            style={{
              backgroundColor: '#FFF',
              borderWidth: 1,
              borderColor: '#D0D5DD',
            }}>
            Previous
          </Btn>
          <Btn
            style={{
              backgroundColor: isCurrentStepComplete()
                ? Color('headerIconBg')
                : '#A0A0A0',
            }}
            disabled={!isCurrentStepComplete()}
            onPress={() =>
              currentIndex < 5 ? setCurrentIndex(currentIndex + 1) : null
            }>
            Next
          </Btn>
        </View>
      )}
    </ScrollView>
  );
};

export default ReturnOrder;
