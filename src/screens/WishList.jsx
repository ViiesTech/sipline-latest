/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import Header from '../components/Header';
import Bar from '../components/Bar';
import Br from '../components/Br';
import { useDispatch, useSelector } from 'react-redux';
import { handleWishList } from '../redux/Actions/UsersActions';
import { LoadingAnimation, NoResultFound } from '../utils/Alert';
import { baseUrl } from '../utils/Api_contents';
import { ActivityIndicator, ToastAndroid, View } from 'react-native';
import { Color } from '../utils/Colors';

const WishList = ({ navigation }) => {
    const dispatch = useDispatch();
    const wishListElements = useSelector((state) => state?.inApp);
    const [pageIndex, setPageIndex] = useState(1);
    const [moreDataLoader, setMoreDataLoader] = useState(false);

    useEffect(() => {
        dispatch(handleWishList(pageIndex));
    }, []);

    const loadMoreData = () => {
        setMoreDataLoader(!moreDataLoader);
        if (wishListElements?.wishList?.lastPage !== pageIndex) {
            setPageIndex(pageIndex + 1);
            setMoreDataLoader(!moreDataLoader);
        } else {
            ToastAndroid.show('Whole data has Loaded Successfully!', ToastAndroid.SHORT);
            setMoreDataLoader(!moreDataLoader);
        }
    };

    return (
        <Background
            detectScrollEnd
            onScrollEnd={loadMoreData}
        >
            <Wrapper>
                <Header onlyTitle navigation={navigation} title={'Wishlist'} withBack />
                <Br space={3} />
                {wishListElements?.loadingState ?
                    <LoadingAnimation />
                    :
                    <>
                        {wishListElements?.wishList?.wishListItems?.length === 0 ?
                            <NoResultFound />
                            :
                            <>
                                {wishListElements?.wishList?.wishListItems?.sort((a, b) => a.id - b.id)?.map((item, index) => {
                                    return (
                                        <Bar
                                            key={index}
                                            navigation={navigation}
                                            ratings={item?.tbl_bar?.overall_ratings}
                                            brandName={item?.tbl_bar?.bar_name}
                                            barDetails={item?.tbl_bar?.bar_details}
                                            // imgUrl={`${baseUrl}/vendor/bars/${item?.tbl_bar?.bar_image}`}
                                            imgUrl={item?.tbl_bar?.bar_image}
                                            onPress={() => navigation.navigate('ShopProfile', { id: item?.tbl_bar?.bar_id })}
                                        />
                                    );
                                })}
                                {moreDataLoader &&
                                    <View style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginBottom: 10 }}>
                                        <ActivityIndicator size={'large'} color={Color('text')} />
                                    </View>
                                }
                            </>

                        }

                    </>

                }
            </Wrapper>
            <Br space={3} />
        </Background>
    );
};


export default WishList;
