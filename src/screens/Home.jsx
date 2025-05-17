/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Background from '../utils/Background';
import Header from '../components/Header';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import Br from '../components/Br';
import {Color} from '../utils/Colors';
import {H4, Pera} from '../utils/Text';
import Wrapper from '../utils/Wrapper';
import NavigationBar from '../components/NavigationBar';
import Btn from '../components/Btn';
import Ratings from '../components/Ratings';
import {useDispatch, useSelector} from 'react-redux';
import {handleHomeData} from '../redux/Actions/BarActions';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {LoadingAnimation} from '../utils/Alert';
import {homeDummyData} from '../utils/LocalData';
import ConfirmLocationModal from '../components/ConfirmLocationModal';
import {nearbyShops} from '../GlobalFunctions/Apis';
import Geolocation from 'react-native-geolocation-service';
import {responsiveHeight} from '../utils/Responsive';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.isLoading);

  // const homeData = useSelector(state => state?.bars);
  const homeData = homeDummyData;
  const [categories, setCategories] = useState([]);
  const [popularBars, setPopularBars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [latLng, setLatLng] = useState({});
  const [nearbyShopsData, setNearbyShopData] = useState();
  const myLocation = useSelector(state => state?.user?.userData?.locationName);

  console.log('nearbyShopsData', nearbyShopsData);
  const getAndRefreshAllData = () => {
    // dispatch(handleHomeData());
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation(); // iOS permission is auto-handled by the system prompt
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLatLng({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log('Location error:', error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);
  useEffect(() => {
    getAndRefreshAllData();
  }, []);

  useEffect(() => {
    if (homeData?.homeData) {
      setPopularBars(homeData?.homeData?.currentBarData);
      setCategories(homeData?.homeData?.category);
    }
  }, [homeData]);

  const handleCategorySelect = categoryName => {
    const filteredBars = homeData?.homeData?.currentBarData?.filter(bar => {
      const categoriesServed = JSON.parse(bar.categories_served);
      return categoriesServed
        .map(cat => cat.toLowerCase())
        .includes(categoryName.toLowerCase());
    });
    if (filteredBars?.length === 0) {
      ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
    } else {
      setPopularBars(filteredBars);
    }
  };

  const getNearbyShops = async () => {
    const response = await nearbyShops(
      latLng.latitude,
      latLng.longitude,
      dispatch,
    );
    setNearbyShopData(response.data);
  };
  useEffect(() => {
    if (latLng) {
      getNearbyShops();
    }
  }, [latLng]);

  const onRefresh = async () => {
    setRefreshing(true);
    // dispatch(handleHomeData({checkLoader: true}));
    // await new Promise(resolve => setTimeout(resolve, 1300)); // Depending on choices
    setRefreshing(false);
  };

  return (
    <>
      <Background noScroll>
        <Wrapper>
          <Header
            myLocation={myLocation}
            navigation={navigation}
            setState={setOpen}
          />
          <Br space={1} />
        </Wrapper>
        {homeData?.barLoadingState ? (
          <LoadingAnimation />
        ) : (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={{height: hp('85%')}}>
              <Wrapper>
                <Br space={1} />
                <Image
                  source={require('../assets/images/home_ad.png')}
                  style={{
                    width: wp('94%'),
                    height: hp('18%'),
                  }}
                  resizeMode="contain"
                />
                <Br space={3} />
              </Wrapper>
              <View>
                <ScrollView
                  style={{flex: 1}}
                  contentContainerStyle={{
                    paddingBottom: hp('1.5%'),
                    paddingLeft: wp('3%'),
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal>
                  {categories?.map((item, index) => {
                    return (
                      <Pressable
                        onPress={() => {
                          handleCategorySelect(item?.category_name);
                        }}
                        key={index}
                        style={{
                          backgroundColor: Color('headerIcon'),
                          paddingVertical: hp('1%'),
                          paddingHorizontal: wp('4%'),
                          borderRadius: 15,
                          shadowColor: Color('text'),
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.23,
                          shadowRadius: 2.62,
                          elevation: 4,
                          marginRight: wp('2%'),
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <Image
                          // source={{
                          //     uri: `${baseUrl}/customer/categories/${item?.category_icon}`,
                          // }}
                          source={require('../assets/images/dummyGlass.png')}
                          style={{
                            width: wp('6%'),
                            height: wp('6%'),
                          }}
                          resizeMode="contain"
                        />
                        <Pera>{item?.category_name}</Pera>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <Wrapper>
                <Br space={3} />
                <H4 extraBold>Near by Popular Bar's and Club</H4>
                <Br space={2} />
              </Wrapper>
              <View>
                {loading ? (
                  <View
                    style={{
                      height: hp('40%'),
                      justifyContent: 'center',
                      bottom: responsiveHeight(2),
                    }}>
                    <ActivityIndicator size={'large'} color={Color('text')} />
                  </View>
                ) : (
                  <FlatList
                    style={{height: hp('40%')}}
                    contentContainerStyle={{
                      paddingBottom: hp('1.5%'),
                      paddingLeft: wp('3%'),
                    }}
                    data={nearbyShopsData}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({item, index}) => (
                      <Pressable
                        onPress={() => {
                          navigation.navigate('ShopProfile', {
                            data: item,
                          });
                        }}
                        key={index}>
                        <ImageBackground
                          // source={{ uri: `${baseUrl}/vendor/bars/${item?.bar_image}` || 'https://lasinfoniavietnam.com/wp-content/uploads/2023/06/Terraco-view-1.jpg' }}
                          source={{uri: `${imageUrl}${item.shopImage}`}}
                          style={{
                            padding: wp('5%'),
                            width: wp('65%'),
                            height: hp('35%'),
                            marginRight: wp('3%'),
                            borderRadius: 10,
                            overflow: 'hidden',
                            justifyContent: 'flex-end',
                          }}>
                          <View>
                            <Ratings
                              style={{marginBottom: hp('0.5%')}}
                              ratings={item?.avgRating}
                            />
                            <H4
                              numberOfLines={1}
                              color={Color('headerIcon')}
                              bold>
                              {item?.barName}
                            </H4>
                          </View>
                        </ImageBackground>
                      </Pressable>
                    )}
                  />
                )}
              </View>
              <Wrapper>
                <Btn
                  onPress={() => navigation.navigate('BarListing')}
                  style={{width: wp('50%'), alignSelf: 'center'}}>
                  View All
                </Btn>
              </Wrapper>
              <Br space={13} />
            </ScrollView>
          </>
        )}
      </Background>
      <NavigationBar />
      <ConfirmLocationModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Home;
