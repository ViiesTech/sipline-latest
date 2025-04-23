/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from './Br';
import { Color } from '../utils/Colors';
import { H5, H6, Pera } from '../utils/Text';
import { useNavigation } from '../utils/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { handleActiveCard } from '../redux/Actions/BarActions';
import { encryption } from '../utils/Alert';


const defaults = {
    height: 200,
    width: Dimensions.get('window').width,
    delay: 5000,
};

const Item = ({ params, height, width, onPress, item, token ,navigation}) => {

    const dispatch = useDispatch();
    const activateCard = (id) => {
        dispatch(handleActiveCard(id));
        navigation.navigate('Checkout', {...params});
    };
    const Name = encryption(item?.card_owner_name,token);
    const expiryDate =  encryption(item?.card_expiry,token);

    return (
        <TouchableOpacity
            onPress={() => { activateCard(item?.id); }}
            activeOpacity={0.8}
            style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginHorizontal: hp('10%'),
                gap: wp('5%'),
                width: wp('50%'),
            }} 
        >
            <ImageBackground
                resizeMode="contain"
                style={{
                    width: wp('90%'),
                    height: wp('90%'),
                }}
                source={require('../assets/images/image.png')}
            >
                <View
                    style={{ position: 'absolute', right: 5, top: hp('6%') }}
                >
                    <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('DeleteCard', { id: item?.id });
                    }}>
                        <Image 
                        style={{
                            width:wp('12%'),
                            height:wp('12%')
                        }}
                        resizeMode='contain'
                        source={require('../assets/images/deleteCard.png')}/>
                    </TouchableOpacity>

                </View>
                <View style={{
                    position: 'absolute', top: wp('25%'), left: wp('15%'),
                }}>
                    <H6 bold>{item.card_type?.toUpperCase()}</H6>
                    <View style={{
                        marginLeft: wp('2%'),
                        marginTop: wp('2%'),
                    }}>
                        <H5 color={Color('headerIcon')} extraBold>{`XXXX  XXXX  XXXX  XXXX`}</H5>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp('8%') }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Pera >Card Holder</Pera>
                            <H6 bold>{Name}</H6>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Pera>Card Expiry</Pera>
                            <H6 bold>{expiryDate}</H6>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const handlePress = (item) => {

};

const CustomCarousel = ({ params, data, height = defaults.height, width = defaults.width, delay = defaults.delay, onPress = handlePress, ItemElement = Item }) => {
    const [selectedIndex, setselectedIndex] = useState(0);
    const [token, setToken] = useState();

    const scrollView = useRef();
    const navigation = useNavigation();

    const setIndex = (event) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const viewSize = event.nativeEvent.layoutMeasurement;
        setselectedIndex(Math.floor(contentOffset.x / viewSize.width));
    };


    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('signCredentials');
        const extractToken = JSON.parse(userToken);
        setToken(extractToken?.token);
    };

    useEffect(() => { getToken(); }, []);
    return (
        <View>
            <ScrollView
                ref={scrollView}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={setIndex}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.carousalContainer}>
                    {data?.map((item) => {
                        return (
                            <ItemElement
                            navigation={navigation}
                                params={params}
                                image={item.url}
                                token={token}
                                item={item}
                                key={item.id}
                                height={height}
                                width={width}
                                {...item}
                                onPress={() => onPress(item)}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            <Br space={2} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {data?.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                width: hp('1.2%'),
                                height: hp('1.2%'),
                                borderRadius: hp('1%'),
                                backgroundColor: index === selectedIndex ? Color('ratingStar') : Color('text'),
                                marginHorizontal: hp('0.8%'),
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carousalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        position: 'absolute',
        bottom: hp('2%'),
        width: hp('100%'),
        paddingLeft: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
});


export default CustomCarousel;
