/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import {Pressable, ToastAndroid, View} from 'react-native';
import Br from '../components/Br';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import DiscountCard from '../components/DiscountCard';
import SegmentTab from '../components/SegmentTab';
import HorizontalLine from '../utils/HorizontalLine';
import {useDispatch, useSelector} from 'react-redux';
import {handleDiscountCoupon} from '../redux/Actions/UsersActions';
import {LoadingAnimation, NoResultFound} from '../utils/Alert';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {default as Clipboard} from '@react-native-clipboard/clipboard';
import {allDiscountDummyData} from '../utils/LocalData';
import {getAllCoupons} from '../GlobalFunctions/Apis';
import {Pera} from '../utils/Text';
import {responsiveFontSize, responsiveHeight} from '../utils/Responsive';

const DiscountCoupons = ({navigation}) => {
  const dispatch = useDispatch();
  const allDiscountData = useSelector(state => state?.inApp);
  const [data, setData] = useState([]);
  const options = ['Unused', 'Used', 'Expired'];
  const [selectedValue, setSelectedValue] = useState(options[0].toString());

  // const getCouponsData = (value) => {
  //     setSelectedValue(value);
  //     dispatch(handleDiscountCoupon(value || selectedValue));
  // };

  // useEffect(() => {
  //     if (!allDiscountData?.allDiscountCoupons?.length) {
  //         getCouponsData();
  //     }
  // }, []);
  const renderAllCoupons = async () => {
    const response = await getAllCoupons();
    setData(response.data);
    console.log('response.data', response.data);
  };
  useEffect(() => {
    renderAllCoupons();
  }, []);
  return (
    <Background>
      <Wrapper>
        <Wrapper>
          <Header
            navigation={navigation}
            onlyTitle
            title="Discounts"
            withBack
          />
        </Wrapper>
      </Wrapper>
      <Br space={4} />
      <Pera
        style={{
          marginLeft: responsiveHeight(3),
          fontSize: responsiveFontSize(1.8),
        }}>
        Long press a coupon to copy its code.
      </Pera>
      {/* <View style={{ paddingLeft: wp('6%') }}>
                <SegmentTab
                    options={options}
                    selectedVal={selectedValue || options[0]}
                    // onPress={getCouponsData}
                />
            </View>
            <HorizontalLine /> */}
      <Wrapper>
        <Br space={2.5} />
        {allDiscountData?.loadingState ? (
          <LoadingAnimation />
        ) : (
          <>
            {data?.allDiscountCoupons?.length === 0 ? (
              <NoResultFound />
            ) : (
              data?.map((item, index) => {
                return (
                  <DiscountCard
                    // getCouponCode={() => {
                    //   Clipboard.setString(item?.couponCode);
                    //   ToastAndroid.show(
                    //     'Coupon code copied to clipboard!',
                    //     ToastAndroid.SHORT,
                    //   );
                    // }}
                    key={index}
                    percentageAmout={
                      item?.discount_type === 'percentage'
                        ? `${item?.discountPercent}%`
                        : `$${parseFloat(item?.discountPercent).toFixed(1)}/-`
                    }
                    // imgUrl={`${baseUrl}/vendor/bars/${item?.bar_image}`}
                    couponCode={item?.couponCode}
                    adminId={item?.couponBy}
                    imgUrl={{uri: `${imageUrl}${item?.couponImage}`}}
                    expiry={item?.endDate}
                    brandName={item?.barName}
                  />
                );
              })
            )}
          </>
        )}
      </Wrapper>
    </Background>
  );
};

export default DiscountCoupons;
