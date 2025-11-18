/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useState} from 'react';
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
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Br from '../components/Br';
import {Color} from '../utils/Colors';
import {H4, H5, H6, Pera} from '../utils/Text';
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
import {
  createCustomer,
  CreateProfile,
  getAllFeatures,
  getAllProducts,
  getAllShops,
  nearbyShops,
} from '../GlobalFunctions/Apis';
import Geolocation from 'react-native-geolocation-service';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';
import PopularJuiceCards from '../components/PopularJuiceCards';
import {ShowToast} from '../GlobalFunctions/ShowToast';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
import {setLocationAdded} from '../reduxNew/Slices';

const Home = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {token, locationAdded, profileCreated} = useSelector(
    state => state.user,
  );
  // console.log('currentLocation', );
  // const homeData = useSelector(state => state?.bars);
  const homeData = homeDummyData;
  // alert(profileCreated);
  // const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [latLng, setLatLng] = useState({});
  const [nearbyShopsData, setNearbyShopData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const {
    latitude,
    longitude,
    fullName,
    email,
    phone,
    _id,
    payCreateCustomerId,
  } = useSelector(state => state.user.userData);
  const {location} = useSelector(state => state?.user?.currentLocation);
  const [featuresData, setFeaturesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log('payCreateCustomerId......', payCreateCustomerId);
  console.log('longitude......', longitude);
  const [categories, setCategories] = useState([
    {id: 1, category_name: 'Shop'},
    {id: 2, category_name: 'Bar'},
    {id: 3, category_name: 'Cafe'},
  ]);
  const name = fullName?.trim();
  const [slides, setSlides] = useState([]);
  let firstName;
  let lastName;

  if (name) {
    const parts = name.split(' ');
    firstName = parts[0];
    lastName = parts.slice(1).join(' ') || 'User';
  }
  console.log('firstName ', firstName + lastName);
  // const getAndRefreshAllData = () => {
  //   // dispatch(handleHomeData());
  // };
  useFocusEffect(
    useCallback(() => {
      if (locationAdded) {
        setOpen(true);
        // reset so it won't open again until set from Map screen
        dispatch(setLocationAdded(false));
      }
    }, [locationAdded]),
  );
  const updateProfile = async payCreateCustomerId => {
    // dispatch(handleProfileUpdate(profile, dob));
    console.log('payCreateCustomerId====', payCreateCustomerId);
    await CreateProfile({
      userId: _id,
      payCreateCustomerId: payCreateCustomerId,
      dispatch,
    });
    // ShowToast('success', response.msg);
  };
  const createCustomerHandler = async () => {
    const response = await createCustomer(
      'SiplineCustomer',
      '1122334455',
      firstName,
      lastName,
      email,
      'https://sipline.com',
      phone,
      phone,
      token,
    );
    console.log('ressponse', response);
    if (response.status === 201) {
      updateProfile(response.data.id);
    }
  };
  const getAllFeaturesHandler = async () => {
    try {
      const response = await getAllFeatures();
      console.log('response=====>>>>', response);
      setFeaturesData(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllFeaturesHandler();
  }, []);

  useEffect(() => {
    if (featuresData?.length) {
      // Format your data for the slider
      const formatted = featuresData?.map((item, index) => ({
        key: String(index),
        title: item.description || '',
        image: item.bannerImage || '',
        shopId: item?.shopId || '',
        adminId: item?.adminId || '',
        productId: item?.productId || '',
      }));
      setSlides(formatted);
    }
  }, [featuresData]);
  useEffect(() => {
    if (token && !payCreateCustomerId) {
      createCustomerHandler();
    }
  }, [token, payCreateCustomerId]);
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
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
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
  // useEffect(() => {
  //   getAndRefreshAllData();
  // }, []);

  // useEffect(() => {
  //   if (homeData?.homeData) {
  //     setPopularBars(homeData?.homeData?.currentBarData);
  //     setCategories(homeData?.homeData?.category);
  //   }
  // }, [homeData]);
  const renderSlide = ({item}) => {
    console.log('itemmmdsdhsjf', item);
    return (
      <View style={styles.slide}>
        <Image
          source={{uri: `${imageUrl}${item.image}`}}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Dark overlay */}
        <View style={styles.overlay} />

        {/* Title text */}
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(4),
            // elevation: 5,
            marginLeft: responsiveHeight(2),

            borderRadius: 5,
            padding: responsiveHeight(1.2),
          }}>
          <Text style={styles.text}>{item.title}</Text>
          <Btn
            onPress={() => {
              item?.productId
                ? navigation.navigate('ProductDetails', {
                    item: {...item.productId},
                  })
                : navigation.navigate('ShopProfile', {
                    shopId: item?.shopId?._id,
                    adminId: item?.adminId,
                  });
            }}
            style={{
              width: responsiveWidth(35),
              borderRadius: responsiveHeight(4),
              height: responsiveHeight(5.5),
              marginTop: responsiveHeight(1.5),
              borderColor: '#fff',
              borderWidth: 1,
            }}>
            Shop Now
          </Btn>
        </View>
      </View>
    );
  };
  const viewAllProducts = async () => {
    const response = await getAllProducts();
    console.log('response======', response);
    if (response?.msg === 'Searched Product Results!') {
      setAllProducts(response?.data);
    }
  };

  // const handleCategorySelect = categoryName => {
  //   // const filteredBars = homeData?.homeData?.currentBarData?.filter(bar => {
  //   //   const categoriesServed = JSON.parse(bar.categories_served);
  //   //   return categoriesServed
  //   //     .map(cat => cat.toLowerCase())
  //   //     .includes(categoryName.toLowerCase());
  //   // });
  //   // if (filteredBars?.length === 0) {
  //   //   ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
  //   // } else {
  //   //   setPopularBars(filteredBars);
  //   // }
  //   setShopType(categoryName);
  // };
  const getNearbyShops = async () => {
    setRefreshing(true);
    const {coordinates} = location;
    setNearbyShopData([]);
    const response = await nearbyShops(
      coordinates[1],
      coordinates[0],
      dispatch,
    );
    console.log('resssponsessee.datasa', response);
    setRefreshing(false);
    setNearbyShopData(response.data);
  };
  const renderAllShops = async () => {
    setRefreshing(true);
    setNearbyShopData([]);

    const response = await getAllShops('');
    // dispatch(setLoading(false));
    setRefreshing(false);

    setNearbyShopData(response.data);

    console.log('response', response.data);
  };
  useEffect(() => {
    if (location?.coordinates) {
      getNearbyShops();
    } else {
      renderAllShops();
    }
  }, [location?.coordinates[0]]);
  useEffect(() => {
    viewAllProducts();
  }, []);
  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   // dispatch(handleHomeData({checkLoader: true}));
  //   // await new Promise(resolve => setTimeout(resolve, 1300)); // Depending on choices
  //   setRefreshing(false);
  // };

  return (
    <>
      <Background noScroll>
        <Wrapper>
          <Header
            myLocation={
              location?.locationName ? location?.locationName : 'Add Location'
            }
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
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    getNearbyShops();
                    viewAllProducts();
                  }}
                />
              }
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={{flexGrow: 1}}>
              {/* <Wrapper>
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
              </Wrapper> */}
              {/* <AppIntroSlider
                data={slides}
                renderItem={renderSlide}
                onSlideChange={index => setActiveIndex(index)}
                showNextButton={false}
                showDoneButton={false}
                renderPagination={() => null}
              />
              <View style={styles.pagination}>
                {featuresData?.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i === activeIndex ? styles.activeDot : null,
                    ]}
                  />
                ))}
              </View> */}
              <Image
                source={require('../assets/images/banner.png')}
                style={styles.image}
                resizeMode="cover"
              />
              {/* <View>
                <ScrollView
                  style={{flexGrow: 1}}
                  contentContainerStyle={{
                    paddingBottom: hp('1.5%'),
                    paddingLeft: wp('3%'),
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal>
                  {categories.map((item, index) => {
                    return (
                      <View
                        style={{
                          backgroundColor: '#fff', // MUST be here for clean shadow
                          borderRadius: 6,
                          elevation: 4,
                          marginRight: wp('2%'),
                        }}>
                        <Pressable
                          onPress={() =>
                            handleCategorySelect(item.category_name)
                          }
                          style={{
                            paddingVertical: responsiveHeight(1),
                            paddingHorizontal: wp('4%'),
                            borderRadius: 15, // Match outer View
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                          }}>
                          <Image
                            source={require('../assets/images/dummyGlass.png')}
                            style={{
                              width: wp('6%'),
                              height: wp('6%'),
                            }}
                            resizeMode="contain"
                          />
                          <Pera>{item.category_name}</Pera>
                        </Pressable>
                      </View>
                    );
                  })}
                </ScrollView>
              </View> */}
              {nearbyShopsData.length < 1 && (
                <Pera
                  style={{
                    margin: responsiveHeight(2),
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '650',
                    alignSelf: 'center',
                    marginBottom: responsiveHeight(4),
                  }}>
                  {'No Shops Found'}
                </Pera>
              )}
              {!refreshing && nearbyShopsData.length > 0 ? (
                <Wrapper>
                  <Wrapper>
                    <Br space={3} />
                    <H4 extraBold>
                      {location?.coordinates
                        ? 'Near by Popular Bars and Club'
                        : 'Popular Bars and Club'}
                    </H4>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BarListing', {type: 'searchShops'})
                      }
                      style={{alignSelf: 'flex-end'}}>
                      <H6 extraBold>View All</H6>
                    </TouchableOpacity>
                    <Br space={2} />
                  </Wrapper>

                  <View>
                    {refreshing ? (
                      <View
                        style={{
                          height: hp('40%'),
                          justifyContent: 'center',
                          bottom: responsiveHeight(2),
                        }}>
                        {/* <ActivityIndicator size={'large'} color={Color('text')} /> */}
                      </View>
                    ) : (
                      <FlatList
                        style={{height: hp('40%')}}
                        contentContainerStyle={{
                          paddingBottom: hp('1.5%'),
                          paddingLeft: wp('3%'),
                          gap: responsiveHeight(2),
                        }}
                        data={nearbyShopsData}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item, index}) => {
                          console.log('item?.shopimage', item?.shopImage);
                          return (
                            <Pressable
                              onPress={() => {
                                navigation.navigate('ShopProfile', {
                                  shopId: item._id,
                                  adminId: item?.adminId,
                                });
                              }}
                              key={index}>
                              {item?.shopImage ? (
                                <ImageBackground
                                  // source={{ uri: `${baseUrl}/vendor/bars/${item?.bar_image}` || 'https://lasinfoniavietnam.com/wp-content/uploads/2023/06/Terraco-view-1.jpg' }}
                                  source={{
                                    uri: `${imageUrl}${item?.shopImage}`,
                                  }}
                                  style={{
                                    padding: wp('5%'),
                                    width: wp('65%'),
                                    height: hp('35%'),
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
                              ) : (
                                <View
                                  style={{
                                    backgroundColor: '#E0E0E0',
                                    padding: wp('5%'),
                                    width: wp('65%'),
                                    height: hp('35%'),
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
                                </View>
                              )}
                            </Pressable>
                          );
                        }}
                      />
                    )}
                  </View>
                </Wrapper>
              ) : null}

              {/* <Wrapper>
                <Btn
                  onPress={() => navigation.navigate('BarListing')}
                  style={{width: wp('50%'), alignSelf: 'center'}}>
                  View All
                </Btn>
              </Wrapper> */}
              {!refreshing && allProducts?.length > 0 ? (
                <Wrapper style={{marginBottom: responsiveHeight(4)}}>
                  <Wrapper>
                    <H4 extraBold>Discover Products</H4>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BarListing', {
                          type: 'searchProducts',
                        })
                      }
                      style={{alignSelf: 'flex-end'}}>
                      <H6 extraBold>View All</H6>
                    </TouchableOpacity>
                    <Br space={2} />
                  </Wrapper>
                  {Array.isArray(allProducts) && allProducts?.length > 0 ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        gap: responsiveHeight(2),
                        marginBottom: responsiveHeight(8),
                        paddingHorizontal: responsiveHeight(2),
                      }}
                      horizontal
                      data={allProducts}
                      keyExtractor={item =>
                        item?._id?.toString() || Math.random().toString()
                      }
                      renderItem={({item}) => {
                        // ✅ Guard against missing images
                        const imageUri = {
                          uri: `${imageUrl}${item?.productImages?.[0]}`,
                        };

                        return (
                          <PopularJuiceCards
                            style={{
                              padding: 0,
                              width: responsiveWidth(38),
                              height: responsiveHeight(15),
                              borderRadius: 10,
                            }}
                            imgrUrl={imageUri}
                            id={item?._id}
                            fvrtsBy={item?.favouriteBy}
                            onFavouriteAdded={viewAllProducts}
                            brandName={item?.brandName}
                            name={item?.name}
                            price={
                              item?.price
                                ? `$${parseFloat(item.price).toFixed(2)}/-`
                                : '$0.00/-'
                            }
                            isChangePosition={false}
                            onPress={() =>
                              navigation.navigate('ProductDetails', {
                                item: {
                                  ...item,
                                  // shopId: shopId
                                },
                              })
                            }
                          />
                        );
                      }}
                    />
                  ) : null}
                </Wrapper>
              ) : null}
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
const styles = StyleSheet.create({
  slide: {
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    width: responsiveWidth(90),
    height: responsiveHeight(24),
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  overlay: {
    position: 'absolute',
    width: responsiveWidth(90),
    borderRadius: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', // Adjust opacity here
  },
  text: {
    width: responsiveWidth(55),
    color: '#fff', // White text to contrast with dark overlay
    fontSize: responsiveFontSize(3),
    fontWeight: '800',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
  },
});
