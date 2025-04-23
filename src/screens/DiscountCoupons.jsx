/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import {  ToastAndroid, View } from 'react-native';
import Br from '../components/Br';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DiscountCard from '../components/DiscountCard';
import SegmentTab from '../components/SegmentTab';
import HorizontalLine from '../utils/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import { handleDiscountCoupon } from '../redux/Actions/UsersActions';
import { LoadingAnimation, NoResultFound } from '../utils/Alert';
import { baseUrl } from '../utils/Api_contents';
import { default as Clipboard } from '@react-native-clipboard/clipboard';
import { allDiscountDummyData } from '../utils/LocalData';


const DiscountCoupons = ({ navigation }) => {
    const dispatch = useDispatch();
    const allDiscountData = useSelector(state => state?.inApp);
    const data = !allDiscountData?.allDiscountCoupons?.length ? allDiscountDummyData : allDiscountData
    const options = ['Unused', 'Used', 'Expired'];
    const [selectedValue, setSelectedValue] = useState(options[0].toString());

    const getCouponsData = (value) => {
        setSelectedValue(value);
        dispatch(handleDiscountCoupon(value || selectedValue));
    };

    useEffect(() => {
        if (!allDiscountData?.allDiscountCoupons?.length) {
            getCouponsData();
        }
    }, []);

    return (
        <Background>
            <Wrapper>
                <Wrapper>
                    <Header navigation={navigation} onlyTitle title="Discounts" withBack />
                </Wrapper>
            </Wrapper>
            <Br space={4} />
            <View style={{ paddingLeft: wp('6%') }}>
                <SegmentTab
                    options={options}
                    selectedVal={selectedValue || options[0]}
                    onPress={getCouponsData}
                />
            </View>
            <HorizontalLine />
            <Wrapper>
                <Br space={2.5} />
                {allDiscountData?.loadingState ?
                    <LoadingAnimation />
                    :
                    <>
                        {
                        data?.allDiscountCoupons?.length === 0
                        ?
                        <NoResultFound />
                        :
                        data?.allDiscountCoupons.map((item, index) => {
                                return (
                                    <DiscountCard
                                        getCouponCode={() => {
                                            if (selectedValue === 'Unused') {
                                                const couponCode = item?.coupon_code?.split('_')?.pop()?.toString();
                                                Clipboard.setString(couponCode);
                                                ToastAndroid.show('Coupon code copied to clipboard!', ToastAndroid.SHORT);
                                                return;
                                              }
                                        }}
                                        key={index}
                                        percentageAmout={item?.discount_type === 'percentage' ? `${item?.discount}%` : `$${parseFloat(item?.discount).toFixed(1)}/-`}
                                        // imgUrl={`${baseUrl}/vendor/bars/${item?.bar_image}`}
                                        imgUrl={item?.bar_image}
                                        expiry={item?.valid_to}
                                        brandName={item?.bar_name}
                                    />
                                );
                            })
                        }
                    </>
                }
            </Wrapper>
        </Background>
    );
};

export default DiscountCoupons;
