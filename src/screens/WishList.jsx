/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import Header from '../components/Header';
import Bar from '../components/Bar';
import Br from '../components/Br';
import {useDispatch, useSelector} from 'react-redux';
import {handleWishList} from '../redux/Actions/UsersActions';
import {LoadingAnimation, NoResultFound} from '../utils/Alert';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {ActivityIndicator, ToastAndroid, View} from 'react-native';
import {Color} from '../utils/Colors';
import {getAllFavourites} from '../GlobalFunctions/Apis';

const WishList = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [moreDataLoader, setMoreDataLoader] = useState(false);
  const {userData, isLoading} = useSelector(state => state.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(handleWishList(pageIndex));
  }, []);

  const loadMoreData = () => {
    setMoreDataLoader(!moreDataLoader);
    if (data !== pageIndex) {
      setPageIndex(pageIndex + 1);
      setMoreDataLoader(!moreDataLoader);
    } else {
      ToastAndroid.show(
        'Whole data has Loaded Successfully!',
        ToastAndroid.SHORT,
      );
      setMoreDataLoader(!moreDataLoader);
    }
  };
  const getAllWishList = async () => {
    const response = await getAllFavourites(userData._id, dispatch);
    console.log('response', response.data);
    setData(response.data);
  };

  useEffect(() => {
    getAllWishList();
  }, []);
  return (
    <Background detectScrollEnd onScrollEnd={loadMoreData}>
      <Wrapper>
        <Header onlyTitle navigation={navigation} title={'Wishlist'} withBack />
        <Br space={3} />
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {data?.length === 0 ? (
              <NoResultFound />
            ) : (
              <>
                {data
                  ?.sort((a, b) => a.id - b.id)
                  ?.map((item, index) => {
                    console.log('item===>>>s', item);
                    return (
                      <Bar
                        key={index}
                        navigation={navigation}
                        ratings={item?.shopId?.avgRating}
                        brandName={item?.shopId?.barName}
                        barDetails={item?.shopId?.barDetails}
                        // imgUrl={`${baseUrl}/vendor/bars/${item?.tbl_bar?.bar_image}`}
                        imgUrl={`${imageUrl}${item?.shopId?.shopImage}`}
                        onPress={() =>
                          navigation.navigate('ShopProfile', {
                            data: item?.shopId,
                          })
                        }
                      />
                    );
                  })}
                {moreDataLoader && (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginBottom: 10,
                    }}>
                    <ActivityIndicator size={'large'} color={Color('text')} />
                  </View>
                )}
              </>
            )}
          </>
        )}
      </Wrapper>
      <Br space={3} />
    </Background>
  );
};

export default WishList;
