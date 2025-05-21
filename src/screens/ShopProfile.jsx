/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import {Clock, Flag, Heart, ShoppingCart, Star1} from 'iconsax-react-native';
import {Color} from '../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../components/Br';
import {H3, H5, H6, Pera} from '../utils/Text';
import MapView, {Marker} from 'react-native-maps';
import SegmentTab from '../components/SegmentTab';
import HorizontalLine from '../utils/HorizontalLine';
import PopularJuiceCards from '../components/PopularJuiceCards';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {handleBarProfileDetails} from '../redux/Actions/BarActions';
import {LoadingAnimation} from '../utils/Alert';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {handleAddOrRemoveWishList} from '../redux/Actions/UsersActions';
import {dummyBarProfile} from '../utils/LocalData';
import mapImg from '../assets/images/Mask.png';
import {
  addToFavourites,
  getAdminProducts,
  getShopById,
} from '../GlobalFunctions/Apis';
import {responsiveHeight} from '../utils/Responsive';

const ShopProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {cartProducts, userData} = useSelector(state => state?.user);
  const [barDetails, setBarDetails] = useState(null);
  const [barProducts, setBarProducts] = useState([]);
  console.log('bar products', barProducts);
  const [categoriesValues, setCategoriesValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddToWish, setIsAddToWish] = useState(barDetails?.id);
  const [tab, setTab] = useState('');
  const {data} = route?.params;
  const [shopData, setShopData] = useState();
  const today = new Date().getDay();
  const todayData = data.workingDays[today - 1];
  const [latLng, setLatLng] = useState(null);
  const [favourites, setFavourites] = useState(false);
  const [isFavourite, setIsFavourite] = useState();

  console.log('today', todayData?.isActive);
  console.log('shopData', shopData);
  useEffect(() => {
    // dispatch(handleBarProfileDetails(route?.params?.id));
  }, []);
  const getAllProducts = async () => {
    const response = await getAdminProducts(data.adminId);
    console.log('responsesssss', response);
    setBarProducts(response.data);
  };
  useEffect(() => {
    if (categoriesValues) {
      setTab(categoriesValues[0]);
    }
  }, [categoriesValues]);
  useEffect(() => {
    getAllProducts();
  }, []);
  //   useEffect(() => {
  //     const data = barProfile?.selectedBarProfile?.length
  //       ? barProfile?.selectedBarProfile
  //       : dummyBarProfile;
  //     if (data) {
  //       setBarDetails(data?.selectedBarProfile[0]);
  //       setBarProducts(data?.selectedBarProfile[1]);
  //       const categoriesServed = data?.selectedBarProfile[0]?.categories_served;
  //       const categoriesArray = categoriesServed
  //         ? JSON.parse(categoriesServed)
  //         : null;
  //       setCategoriesValues(categoriesArray);
  //       setIsLoading(false);
  //     }
  //   }, [barProfile?.selectedBarProfile, dummyBarProfile]);

  useEffect(() => {
    setIsAddToWish(barDetails?.id);
  }, [barDetails]);
  const getShopDetailsById = async () => {
    try {
      const response = await getShopById(data._id);
      setShopData(response.data);
      // Safely extract lat/lng
      const coords = response.data?.location?.coordinates;
      if (coords && coords.length === 2) {
        setLatLng({
          latitude: coords[1],
          longitude: coords[0],
        });
      }
    } catch (error) {
      console.error('Error fetching shop details:', error);
    }
  };
  useEffect(() => {
    getShopDetailsById();
  }, []);
  useEffect(() => {
    if (shopData?.favouriteBy && userData?._id) {
      const isFav = shopData.favouriteBy.includes(userData._id);
      setIsFavourite(isFav);
    }
  }, [shopData, userData]);
  const Cart = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyCart', {barId: barDetails?.bar_id});
        }}
        style={styles.mainCart}>
        <View style={styles.cartIconCont}>
          <ShoppingCart size={hp('3%')} color={Color('text')} variant="Bold" />
          <H6 bold>Cart</H6>
        </View>
        <View style={styles.itemInCart}>
          <H6 color={Color('headerIcon')}>{`${cartProducts?.length}`}</H6>
        </View>
      </TouchableOpacity>
    );
  };

  const handleAddToFavourites = async () => {
    console.log('userData', userData._id);
    console.log('shopId', data._id);
    const response = await addToFavourites(userData._id, data._id);
    setIsFavourite(!isFavourite);
    console.log('addtofavourites', response);
  };
  return (
    <>
      <Background>
        {isLoading ? (
          <View style={{justifyContent: 'center', alignSelf: 'center'}}>
            <LoadingAnimation />
          </View>
        ) : (
          <>
            <Wrapper>
              <Header
                withBack
                onlyTitle
                title={'Shop profile'}
                navigation={navigation}>
                <TouchableOpacity
                  onPress={() => {
                    handleAddToFavourites();
                    // setIsAddToWish(!isAddToWish);
                    // dispatch(handleAddOrRemoveWishList(barDetails?.bar_id));
                  }}>
                  <Heart
                    size={hp('3.5%')}
                    color={Color('headerIconBg')}
                    variant={isFavourite ? 'Bold' : 'Outline'}
                  />
                </TouchableOpacity>
              </Header>
              <Br space={3} />
              <Image
                resizeMode="cover"
                // source={{
                //     uri:barDetails !== null ? `${baseUrl}/vendor/bars/${barDetails?.bar_image}` :  'https://i.imghippo.com/files/IBOmT1729190109.webp',
                // }}
                source={{uri: `${imageUrl}${shopData?.shopImage}`}}
                style={{width: wp('94%'), height: hp('20%'), borderRadius: 4}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: hp('2%'),
                  flexWrap: 'wrap',
                }}>
                <H3 bold>
                  {shopData?.barName ? shopData?.barName : 'Loading...'}
                </H3>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: wp('2%'),
                  }}>
                  <Star1
                    size={hp('2.5%')}
                    color={Color('ratingStar')}
                    variant="Bold"
                  />
                  <Pera medium>{`${
                    shopData?.avgRating != null ? shopData?.avgRating : 0
                  } | Rating`}</Pera>
                </View>
              </View>
              <Br space={1} />
              <View style={styles.container}>
                {/* <MapView
                                    style={styles.map}
                                    region={{
                                        latitude: barDetails?.latitude == null ? 44.968046 : barDetails?.latitude,
                                        longitude: barDetails?.longitude == null ? -94.420307 : barDetails?.longitude,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    }}
                                /> */}
                {/* <Image source={mapImg} style={{width: wp('94%')}} />
                 */}
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    borderRadius: responsiveHeight(2),
                    overflow: 'hidden', // very important
                  }}>
                  {latLng ? (
                    <MapView
                      mapType="terrain"
                      style={{flex: 1}}
                      initialRegion={{
                        latitude: latLng.latitude,
                        longitude: latLng.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                      }}>
                      <Marker coordinate={latLng} />
                    </MapView>
                  ) : (
                    <Text>Loading Map...</Text> // or show a spinner
                  )}
                </View>
              </View>
              <Br space={2} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: wp('2%'),
                }}>
                <Flag
                  size={hp('2.5%')}
                  color={Color('text')}
                  variant="Outline"
                />
                <Pera
                  medium
                  color={Color(
                    'text',
                  )}>{` Average Cooking time ${shopData?.cookingTime}`}</Pera>
              </View>
              <Br space={2} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: wp('2%'),
                }}>
                <Clock
                  size={hp('2.5%')}
                  color={Color('text')}
                  variant="Outline"
                />
                {/* <Pera medium color={Color('text')}>{`Opening hours - ${
                  barDetails?.work_start_time || '00:00'
                } to ${barDetails?.work_start_time || '00:00'}`}</Pera> */}
                {todayData &&
                todayData?.isActive &&
                todayData?.openingTime &&
                todayData?.closeingTime ? (
                  <Pera medium color={Color('text')}>
                    Opening hours - {todayData.openingTime} AM to{' '}
                    {todayData.closeingTime} PM
                  </Pera>
                ) : (
                  <Pera medium color="red">
                    Closed
                  </Pera>
                )}
              </View>
            </Wrapper>
            <Br space={3} />
            <View style={{paddingLeft: wp('3%')}}>
              {categoriesValues?.length === 0 ? (
                <Pera>No categories found</Pera>
              ) : (
                <>
                  <SegmentTab
                    options={categoriesValues}
                    selectedVal={tab}
                    onPress={value => setTab(value.toLowerCase())}
                  />
                </>
              )}
            </View>
            <HorizontalLine />
            <Br space={2} />
            <H5 extraBold style={{paddingLeft: wp('3')}} color={Color('text')}>
              Popular Juice
            </H5>
            <Wrapper>
              <Br space={2} />
              <View
                style={{flexDirection: 'row', flexWrap: 'wrap', gap: wp('3%')}}>
                {barProducts?.length === 0 ? (
                  <View style={{alignSelf: 'center'}}>
                    <Pera>No products found</Pera>
                  </View>
                ) : (
                  <>
                    {barProducts
                      //   ?.filter(val =>
                      //     val?.tbl_category?.category_name
                      //       ?.toLowerCase()
                      //       .includes(tab),
                      //   )
                      .map((item, index) => {
                        console.log('item===>>>', item);
                        // const imagPath = item.product_images?.replace(/[\[\]']+/g, '');
                        return (
                          <View style={{width: '48%', flexDirection: 'row'}}>
                            <PopularJuiceCards
                              style={{
                                width: wp('45%'),
                                height: wp('50%'),
                              }}
                              key={index}
                              // imgrUrl={`${baseUrl}/customer/products/${imagPath}`}
                              imgrUrl={{
                                uri: `${imageUrl}${item.productImages[0]}`,
                              }}
                              name={item?.name}
                              price={`$ ${item?.price}`}
                              isVariations={
                                item?.variants.length === 0 ? false : true
                              }
                              isChangePosition={true}
                              // onPress={() =>
                              //   navigation.navigate('ProductDetails', {
                              //     id: item?.id,
                              //     barId: data?._id,
                              //   })
                              // }
                              onPress={() =>
                                navigation.navigate('ProductDetails', {
                                  item: {...item, shopId: data._id},
                                })
                              }
                            />
                          </View>
                        );
                      })}
                  </>
                )}
              </View>
              <Br space={10} />
            </Wrapper>
          </>
        )}
      </Background>
      <Cart />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('18%'),
    alignItems: 'stretch',
    marginTop: wp('3%'),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mainCart: {
    position: 'absolute',
    bottom: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color('headerIcon'),
    width: wp('94%'),
    paddingVertical: hp('1%'),
    borderRadius: hp('50%'),
    alignSelf: 'center',
    zIndex: 1,
    shadowColor: Color('text'),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    justifyContent: 'space-between',
    paddingHorizontal: hp('2%'),
  },
  cartIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  itemInCart: {
    backgroundColor: Color('headerIconBg'),
    width: wp('9%'),
    height: wp('9%'),
    justifyContent: 'center',
    borderRadius: hp('2.5%'),
    alignItems: 'center',
  },
});

export default ShopProfile;
