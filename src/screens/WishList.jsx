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
import PopularJuiceCards from '../components/PopularJuiceCards';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import { ShowToast } from '../GlobalFunctions/ShowToast';

const WishList = ({navigation, route}) => {
  const {renderProducts} = route.params || {};
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [moreDataLoader, setMoreDataLoader] = useState(false);
  const {userData} = useSelector(state => state.user);
  const [isLoading,setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(handleWishList(pageIndex));
  }, []);
  console.log('renderProducts', renderProducts);
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
    setIsLoading(true);
    try {
      const response = await getAllFavourites(userData._id, dispatch);
      setIsLoading(false);
      setData(response.data);
      console.log('response===>>>', response);
    } catch (error) {
      setIsLoading(false);
      ShowToast('error',error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getAllWishList();
  }, []);
  return (
    <Background detectScrollEnd onScrollEnd={loadMoreData}>
      {/* <Wrapper>
        <Header
          onlyTitle
          navigation={navigation}
          title={'Favorite Bars'}
          withBack
        />
        <Br space={3} />
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {data?.length === 0 ? (
              <NoResultFound />
            ) :
            //  (
              // <>
              //   {data
              //     ?.sort((a, b) => a.id - b.id)
              //     ?.map((item, index) => {
              //       console.log('item===>>>s', item);
              //       return (
              //         <Bar
              //           key={index}
              //           navigation={navigation}
              //           ratings={item?.shopId?.avgRating}
              //           brandName={item?.shopId?.barName}
              //           barDetails={item?.shopId?.barDetails}
              //           // imgUrl={`${baseUrl}/vendor/bars/${item?.tbl_bar?.bar_image}`}
              //           imgUrl={`${imageUrl}${item?.shopId?.shopImage}`}
              //           onPress={() =>
              //             navigation.navigate('ShopProfile', {
              //               shopId: item?.shopId?._id,
              //               adminId: item?.shopId?.adminId,
              //             })
              //           }
              //         />
              //       );
              //     })}
              //   {moreDataLoader && (
              //     <View
              //       style={{
              //         alignSelf: 'center',
              //         justifyContent: 'center',
              //         alignContent: 'center',
              //         marginBottom: 10,
              //       }}>
              //       <ActivityIndicator size={'large'} color={Color('text')} />
              //     </View>
              //   )}
              // </>
              <>
      {renderProducts
        ? // ✅ Render products
          data?.map((item, index) => (
            <PopularJuiceCards
              containerStyle={{
                flexDirection: 'row',
                gap: responsiveHeight(2),
              }}
              key={item?._id || index}
              style={{
                padding: 0,
                width: responsiveWidth(38),
                height: responsiveHeight(15),
                borderRadius: 10,
              }}
              id={item?._id}
              fvrtsBy={item?.favouriteBy}
              onFavouriteAdded={handleSearch} // or getAllProducts
              imgrUrl={{ uri: `${imageUrl}${item?.productImages[0]}` }}
              name={item?.name}
              brandName={item?.brandName}
              price={`$${parseFloat(item?.price).toFixed(2)}/-`}
              isChangePosition={false}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  item: { ...item },
                })
              }
            />
          ))
        : // ✅ Render bars
          data
            ?.sort((a, b) => a.id - b.id)
            ?.map((item, index) => (
              <Bar
                key={index}
                navigation={navigation}
                ratings={item?.shopId?.avgRating}
                brandName={item?.shopId?.barName}
                barDetails={item?.shopId?.barDetails}
                imgUrl={`${imageUrl}${item?.shopId?.shopImage}`}
                onPress={() =>
                  navigation.navigate('ShopProfile', {
                    shopId: item?.shopId?._id,
                    adminId: item?.shopId?.adminId,
                  })
                }
              />
            ))}
            }
          </>
        )}
      </Wrapper> */}
      <Wrapper>
        <Header
          onlyTitle
          navigation={navigation}
          title={renderProducts ? 'Liked Drinks' : 'Favorite Bars'}
          withBack
        />
        <Br space={3} />
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {data?.length === 0 ? (
              <NoResultFound />
            ) : (
              <>
                {renderProducts
                  ? data
                      ?.filter(item => item?.productId) // ✅ Only items with productId
                      .map((item, index) => (
                        <PopularJuiceCards
                          key={item?.productId?._id || index}
                          containerStyle={{
                            flexDirection: 'row',
                            marginTop: responsiveHeight(2),
                            gap: responsiveHeight(2),
                          }}
                          style={{
                            padding: 0,
                            width: responsiveWidth(38),
                            height: responsiveHeight(15),
                            borderRadius: 10,
                          }}
                          id={item?.productId?._id}
                          fvrtsBy={item?.productId?.favouriteBy}
                          onFavouriteAdded={getAllWishList}
                          imgrUrl={
                            item?.productId?.productImages?.[0]
                              ? {
                                  uri: `${imageUrl}${item?.productId?.productImages[0]}`,
                                }
                              : require('../assets/images/mauris.png')
                          }
                          name={item?.productId?.name || 'Unknown Product'}
                          brandName={
                            item?.productId?.brandName || 'Unknown Brand'
                          }
                          price={
                            item?.productId?.price
                              ? `$${parseFloat(item.productId.price).toFixed(
                                  2,
                                )}/-`
                              : '$0.00/-'
                          }
                          isChangePosition={false}
                          onPress={() =>
                            navigation.navigate('ProductDetails', {
                              item: item?.productId,
                            })
                          }
                        />
                      ))
                  : data
                      ?.filter(item => item?.shopId) // ✅ Only items with shopId
                      .map((item, index) => (
                        <Bar
                          key={index}
                          navigation={navigation}
                          ratings={item?.shopId?.avgRating}
                          brandName={item?.shopId?.barName}
                          barDetails={item?.shopId?.barDetails}
                          imgUrl={`${imageUrl}${item?.shopId?.shopImage}`}
                          onPress={() =>
                            navigation.navigate('ShopProfile', {
                              shopId: item?.shopId?._id,
                              adminId: item?.shopId?.adminId,
                            })
                          }
                        />
                      ))}
                {moreDataLoader && (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginBottom: 10,
                    }}>
                    <ActivityIndicator size="large" color={Color('text')} />
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
