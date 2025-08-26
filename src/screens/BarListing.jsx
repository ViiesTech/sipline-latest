/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import Bar from '../components/Bar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {H6, Pera} from '../utils/Text';
import Sheet from '../components/Sheet';
import LocationSearchBar from '../components/LocationSearchBar';
import Badge from '../components/Badge';
import {Color} from '../utils/Colors';
import {Refresh} from 'iconsax-react-native';
import Btn from '../components/Btn';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {LineChart} from 'react-native-chart-kit';
import {useDispatch, useSelector} from 'react-redux';
import {handleBarLists} from '../redux/Actions/BarActions';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import {LoadingAnimation} from '../utils/Alert';
import {barListingDummyData} from '../utils/LocalData';
import {getAllShops, searchProduct} from '../GlobalFunctions/Apis';
import {setLoading} from '../reduxNew/Slices';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import RangeSlider from 'rn-range-slider';
import PopularJuiceCards from '../components/PopularJuiceCards';

const BarListing = ({navigation, route}) => {
  const drinkQuality = [
    'Mango',
    'Bnana',
    'Orange',
    'Strawberry',
    'Mango',
    'Orange',
    'Grapes',
  ];
  const popularDrink = ['New Arrivals', 'Customer Favorites'];
  const RatingStarStanup = [
    '1 Star and Up',
    '2 Star and Up',
    '3 Star and Up',
    '4 Star Stand Up',
    '5 Star Stand Up',
  ];
  const NutrinitionalBenfits = [
    'High in Viatmin C',
    'High Antioxidants',
    'Detoxifying',
    'energizing',
  ];
  const [open, setOpen] = useState(false);
  // const barLists = useSelector(state => state?.bars);
  const barLists = barListingDummyData;
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  // const {isLoading} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [barListData, setBarListData] = useState([]);
  const [moreDataLoader, setMoreDataLoader] = useState(false);
  const [seacrhedValue, setSearchedValue] = useState();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [products, setProducts] = useState();
  const [searchProducts, setSearchProducts] = useState('');
  const {type} = route?.params;
  console.log('products', products);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(null);
  const [currentDrinkQuality, setCurrentDrinkQuality] = useState('');
  const [selectedRatingsIndex, setSelectedRatingsIndex] = useState(null);
  const [currentRatings, setCurrentRatings] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  console.log('current drink quality', currentDrinkQuality);
  console.log(currentRatings);

  // useEffect(() => {
  //   if (!barListData?.length) {
  //     setLoading(true);
  //     dispatch(handleBarLists(pageIndex));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (barLists?.barList?.barData) {
  //     setLoading(false);
  //     console.log('...barListData', ...barListData);
  //     setBarListData([...barListData, ...barLists?.barList?.barData]);
  //     setPageIndex(pageIndex + 1);
  //   }
  // }, [barLists]);
  const handleBadgePress = index => {
    setSelectedDrinkIndex(index);
    setCurrentDrinkQuality(drinkQuality[index]);
  };
  const handleRatingsPress = index => {
    setSelectedRatingsIndex(index);
    setCurrentRatings(index + 1);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const response = await searchProduct(
      seacrhedValue,
      // currentDrinkQuality,
      // currentRatings,
      // priceRange[0],
      // priceRange[1],
      // dispatch,
    );
    setIsLoading(false);
    setOpen(false);
    if (response.msg === 'Searched Product Results!') {
      setBarListData('');
      setProducts(response.data);
    } else {
      setProducts('');
      setBarListData(response?.data);
    }
  };
  // useEffect(() => {
  //   // if (type !== 'searchShops') {
  //   handleSearch();
  //   // }
  // }, [seacrhedValue]);
  const loadMoreData = () => {
    setMoreDataLoader(!moreDataLoader);
    if (
      pageIndex < barLists?.barList?.lastPage ||
      pageIndex === barLists?.barList?.lastPage
    ) {
      setPageIndex(pageIndex + 1);
      dispatch(handleBarLists(pageIndex));
      setBarListData([...barListData, ...barLists?.barList?.barData]);
      setMoreDataLoader(!moreDataLoader);
    } else {
      ToastAndroid.show(
        'Whole data has Loaded Successfully!',
        ToastAndroid.SHORT,
      );
      setMoreDataLoader(!moreDataLoader);
    }
  };
  const renderAllShops = async () => {
    const query = seacrhedValue ? seacrhedValue : '';
    // dispatch(setLoading(true));
    setIsLoading(true);
    setBarListData('');
    setProducts('');
    const response = await getAllShops(query);
    // dispatch(setLoading(false));
    setIsLoading(false);

    setBarListData(response.data);
    console.log('response', response.data);
  };

  useEffect(() => {
    if (type === 'searchShops') {
      if (seacrhedValue) {
        console.log('search', seacrhedValue);
        handleSearch();
      } else {
        console.log('renderAllShops');
        renderAllShops();
      }
    } else {
      handleSearch();
    }
  }, [seacrhedValue, type]);
  return (
    <>
      <View
        style={{
          padding: responsiveHeight(2),
          paddingBottom: responsiveHeight(0.1),
          backgroundColor: '#fff',
        }}>
        <Header
          // showFilteration={type === 'searchProducts' ? true : false}
          navigation={navigation}
          setState={setOpen}
          withSearch
          handleTextChange={txt => setSearchedValue(txt)}
        />
      </View>
      <Background
      // detectScrollEnd
      // onScrollEnd={loadMoreData}
      // onRefresh={loadMoreData}
      // refreshing={moreDataLoader}
      >
        <Wrapper>
          {/* <Br space={8} /> */}
          <Wrapper>
            {isLoading ? (
              <LoadingAnimation />
            ) : Array.isArray(products) && products.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: responsiveHeight(2),
                  marginBottom: responsiveHeight(8),
                  paddingHorizontal: responsiveHeight(2),
                }}
                data={products}
                renderItem={({item}) => {
                  console.log('iiiiitem', item);
                  return (
                    <PopularJuiceCards
                      containerStyle={{
                        flexDirection: 'row',
                        gap: responsiveHeight(2),
                      }}
                      key={item?._id}
                      style={{
                        padding: 0,
                        width: responsiveWidth(38),
                        height: responsiveHeight(15),
                        borderRadius: 10,
                      }}
                      id={item?._id}
                      fvrtsBy={item?.favouriteBy}
                      onFavouriteAdded={handleSearch}
                      imgrUrl={{uri: `${imageUrl}${item?.productImages[0]}`}}
                      name={item?.name}
                      brandName={item?.brandName}
                      price={`$${parseFloat(item?.price).toFixed(2)}/-`}
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
            ) : (
              <>
                {barListData?.map((item, index) => (
                  <Bar
                    key={index}
                    onPress={() => {
                      navigation.navigate('ShopProfile', {
                        shopId: item?._id,
                        adminId: item?.adminId,
                      });
                    }}
                    ratings={item?.avgRating}
                    brandName={item?.barName}
                    barDetails={item?.barDetails}
                    imgUrl={`${imageUrl}/${item?.shopImage}`}
                  />
                ))}
                {moreDataLoader && (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginBottom: hp('2%'),
                    }}>
                    <ActivityIndicator size={'large'} color={'#000'} />
                  </View>
                )}
              </>
            )}
          </Wrapper>
        </Wrapper>
      </Background>
      {/* Sheet API */}
      <Sheet open={open} setOpen={setOpen} height={hp('90%')}>
        <Wrapper x={2}>
          <Br space={2} />
          {/* <H6 medium style={{marginBottom: wp('3%')}}>
            Search Your Location
          </H6>
          <LocationSearchBar /> */}
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={{
              backgroundColor: '#000',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              height: responsiveHeight(3),
              width: responsiveWidth(6),
              borderRadius: responsiveHeight(2),
            }}>
            <H6
              medium
              style={{color: '#fff', alignSelf: 'center', fontWeight: 'bold'}}>
              X
            </H6>
          </TouchableOpacity>
          <H6 medium style={{marginBottom: wp('3%')}}>
            Drink Categories
          </H6>
        </Wrapper>
        <Badge
          isHorixontal={true}
          options={drinkQuality}
          selectedIndex={selectedDrinkIndex}
          onPress={handleBadgePress}
        />
        {/* <Wrapper x={2}>
          <H6 medium style={{marginTop: wp('3%'), marginBottom: wp('3%')}}>
            Popularity
          </H6>
        </Wrapper>
        <Badge isHorixontal={true} options={popularDrink} onPress={() => {}} /> */}
        <Wrapper x={2}>
          <H6 medium style={{marginTop: wp('3%'), marginBottom: wp('3%')}}>
            Ratings
          </H6>
        </Wrapper>
        <Badge
          isHorixontal={true}
          options={RatingStarStanup}
          selectedIndex={selectedRatingsIndex}
          onPress={handleRatingsPress}
        />
        {/* <Wrapper x={2}>
          <H6 medium style={{marginTop: wp('3%'), marginBottom: wp('3%')}}>
            Nutritional Benefits
          </H6>
        </Wrapper>
        <Badge
          isHorixontal={false}
          options={NutrinitionalBenfits}
          onPress={() => {}}
        /> */}
        <Br space={3} />
        <Wrapper x={2}>
          <H6 medium style={{marginTop: wp('3%'), marginBottom: wp('1%')}}>
            Price Range
          </H6>
          <Pera>
            Price Range: {priceRange[0]} - {priceRange[1]}
          </Pera>
          {/* <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={wp('88%')} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          /> */}
          <View style={styles.container}>
            <ImageBackground
              source={require('../assets/images/graph-bg.png')} // Replace with your image path
              resizeMode="stretch"
              style={styles.graph}></ImageBackground>
            <View
              style={{
                flex: 1,
                bottom: responsiveHeight(3),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MultiSlider
                values={priceRange}
                sliderLength={Dimensions.get('window').width - 40}
                // onValuesChange={values => setPriceRange(values)}
                onValuesChangeFinish={value => setPriceRange(value)}
                step={1}
                markerStyle={styles.thumb}
                min={0}
                max={1000}
                selectedStyle={{
                  backgroundColor: '#F3B71C',
                }}
                unselectedStyle={{
                  backgroundColor: 'transparent',
                }}
              />
            </View>
          </View>
          <Br space={3} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: hp('10%'),
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: hp('1%'),
              }}>
              <Refresh size={hp('2.5%')} color={Color('text')} />
              <TouchableOpacity
                onPress={() => {
                  setCurrentRatings('');
                  setSelectedDrinkIndex(null);
                  setSelectedRatingsIndex(null);
                  setCurrentDrinkQuality('');
                }}>
                <Pera>Reset All</Pera>
              </TouchableOpacity>
            </TouchableOpacity>
            <View>
              <Btn
                loading={searchLoading}
                onPress={() => handleSearch()}
                style={{width: wp('40%')}}>
                Show Result
              </Btn>
            </View>
          </View>
        </Wrapper>
      </Sheet>
    </>
  );
};

export default BarListing;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  graph: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  thumb: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  rail: {
    flex: 1,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  railSelected: {
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: 'black',
  },
  label: {
    padding: 4,
    borderRadius: 4,
  },
});
