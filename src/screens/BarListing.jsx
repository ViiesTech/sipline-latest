/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import Br from '../components/Br';
import Bar from '../components/Bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ActivityIndicator, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { H6, Pera } from '../utils/Text';
import Sheet from '../components/Sheet';
import LocationSearchBar from '../components/LocationSearchBar';
import Badge from '../components/Badge';
import { Color } from '../utils/Colors';
import { Refresh } from 'iconsax-react-native';
import Btn from '../components/Btn';

import {LineChart} from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { handleBarLists } from '../redux/Actions/BarActions';
import { baseUrl } from '../utils/Api_contents';
import { LoadingAnimation } from '../utils/Alert';
import { barListingDummyData } from '../utils/LocalData';

const BarListing = ({ navigation }) => {
    const drinkQuality = ['Mango', 'Bnana', 'Orange', 'Strawberry', 'Mango', 'Orange', 'Grapes'];
    const popularDrink = ['New Arrivals', 'Customer Favorites'];
    const RatingStarStanup = ['1 Star and Up', '2 Star and Up', '3 Star and Up', '4 Star Stand Up', '5 Star Stand Up'];
    const NutrinitionalBenfits = ['High in Viatmin C', 'High Antioxidants', 'Detoxifying', 'energizing'];
    const [open, setOpen] = useState(false);
    // const barLists = useSelector(state => state?.bars);
    const barLists = barListingDummyData;
    const dispatch = useDispatch();
    const [pageIndex, setPageIndex] = useState(1);
    const [barListData, setBarListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [moreDataLoader, setMoreDataLoader] = useState(false);

    useEffect(() => {
        if (!barListData?.length) {
            setLoading(true);
            dispatch(handleBarLists(pageIndex));
        }
    }, []);

    useEffect(() => {
        if (barLists?.barList?.barData) {
            setLoading(false);
            console.log('...barListData', ...barListData)
            setBarListData([...barListData, ...barLists?.barList?.barData]);
            setPageIndex(pageIndex + 1);
        }
    }, [barLists]);

    const loadMoreData = () => {
        setMoreDataLoader(!moreDataLoader);
        if (pageIndex < barLists?.barList?.lastPage || pageIndex === barLists?.barList?.lastPage) {
            setPageIndex(pageIndex + 1);
            dispatch(handleBarLists(pageIndex));
            setBarListData([...barListData, ...barLists?.barList?.barData]);
            setMoreDataLoader(!moreDataLoader);
        } else {
            ToastAndroid.show('Whole data has Loaded Successfully!', ToastAndroid.SHORT);
            setMoreDataLoader(!moreDataLoader);
        }
    };

    return (
        <>
            <Header
                navigation={navigation}
                setState={setOpen}
                withSearch
                fixed
            />
            <Background
                // detectScrollEnd
                // onScrollEnd={loadMoreData}
                // onRefresh={loadMoreData}
                // refreshing={moreDataLoader}
            >
                <Wrapper>
                    <Br space={8} />
                    <Wrapper>
                        {loading ?
                            <LoadingAnimation />
                            :
                            <>
                                {barListData?.sort((a, b) => a.bar_id - b.bar_id)?.map((item, index) => {
                                    return (
                                        <>
                                            <Bar
                                                key={index}
                                                onPress={() => {
                                                    navigation.navigate('ShopProfile', { id: item?.bar_id });
                                                }}
                                                ratings={item?.overall_ratings}
                                                brandName={item?.bar_name}
                                                barDetails={item?.bar_details}
                                                // imgUrl={`${baseUrl}/vendor/bars/${item?.bar_image}`}
                                                imgUrl={require('../assets/images/dummyGlass.png')}
                                                />
                                        </>
                                    );
                                })}
                                {moreDataLoader &&
                                    <View style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginBottom: hp('2%') }}>
                                        <ActivityIndicator size={'large'} color={'#000'} />
                                    </View>
                                }
                            </>
                        }
                    </Wrapper>
                </Wrapper>
            </Background>
            {/* Sheet API */}
            <Sheet open={open} setOpen={setOpen} height={hp('90%')}>
                <Wrapper x={2}>
                    <Br space={4} />
                    <H6 medium style={{ marginBottom: wp('3%') }}>Search Your Location</H6>
                    <LocationSearchBar />
                    <H6 medium style={{ marginBottom: wp('3%') }}>Drink Categories</H6>
                </Wrapper>
                <Badge
                    isHorixontal={true}
                    options={drinkQuality}
                />
                <Wrapper x={2}>
                    <H6 medium style={{ marginTop: wp('3%'), marginBottom: wp('3%') }}>Popularity</H6>
                </Wrapper>
                <Badge
                    isHorixontal={true}
                    options={popularDrink}
                />
                <Wrapper x={2}>
                    <H6 medium style={{ marginTop: wp('3%'), marginBottom: wp('3%') }}>Ratings</H6>
                </Wrapper>
                <Badge
                    isHorixontal={true}
                    options={RatingStarStanup}
                />
                <Wrapper x={2}>
                    <H6 medium style={{ marginTop: wp('3%'), marginBottom: wp('3%') }}>Nutritional Benefits</H6>
                </Wrapper>
                <Badge
                    isHorixontal={false}
                    options={NutrinitionalBenfits}
                />
                <Br space={3} />
                <Wrapper x={2}>
                    <H6 medium style={{ marginTop: wp('3%'), marginBottom: wp('1%') }}>Price Range</H6>
                    <Pera>$150 - $200</Pera>
                    <LineChart
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
                    />
                    <Br space={3} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: hp('10%') }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: hp('1%') }}>
                            <Refresh size={hp('2.5%')} color={Color('text')} />
                            <Pera>Reset All</Pera>
                        </TouchableOpacity>
                        <View>
                            <Btn onPress={() => setOpen(false)} style={{ width: wp('40%') }}>Show Result</Btn>
                        </View>
                    </View>
                </Wrapper>
            </Sheet>
        </>
    );
};

export default BarListing;
