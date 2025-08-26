/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from './Br';
import {Color} from '../utils/Colors';
import {H3, H4, H5, H6, Pera} from '../utils/Text';
import {useNavigation} from '../utils/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {handleActiveCard} from '../redux/Actions/BarActions';
import {encryption} from '../utils/Alert';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';

const defaults = {
  height: 200,
  width: Dimensions.get('window').width,
  delay: 5000,
};

const Item = ({
  params,
  height,
  width,
  onPress,
  item,
  token,
  isSelected,
  navigation,
  setSelectedCardId,
  onCardSelect,
  pressable,
}) => {
  const dispatch = useDispatch();
  const activateCard = id => {
    setSelectedCardId(id); // Mark card as selected
    onCardSelect(item);
    // dispatch(handleActiveCard(id));
    // navigation.navigate('Checkout', {...params});
  };
  const Name = encryption(item?.name, token);
  const expiryMonth = item?.expiry_month?.toString().padStart(2, '0');
  const expiryYear = item?.expiry_year?.toString().slice(-2);

  const formattedExpiry = `${expiryMonth}/${expiryYear}`;

  return (
    <TouchableOpacity
      onPress={() => {
        pressable ? activateCard(item?.id) : null;
      }}
      activeOpacity={0.8}
      style={{
        marginTop: responsiveHeight(4),
        // justifyContent: 'center',
        // flexDirection: 'row',
        // marginHorizontal: hp('10%'),
        // gap: wp('5%'),
        // width: wp('50%'),
      }}>
      <ImageBackground
        // resizeMode="contain"
        style={{
          width: responsiveWidth(89.5),
          height: responsiveHeight(24),
        }}
        imageStyle={{
          borderRadius: responsiveHeight(2),
          borderWidth: isSelected ? 3 : 0,
          borderColor: isSelected ? '#F57C00' : 'transparent',
        }}
        source={require('../assets/images/cardBg.png')}>
        {/* <View style={{position: 'absolute', right: 5, top: hp('6%')}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DeleteCard', {id: item?.id});
            }}>
            <Image
              style={{
                width: wp('12%'),
                height: wp('12%'),
              }}
              resizeMode="contain"
              source={require('../assets/images/deleteCard.png')}
            />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: responsiveHeight(2),
            // position: 'absolute',
            // top: wp('25%'),
            // left: wp('15%'),
          }}>
          <H5 style={{fontWeight: 'bold', fontSize: responsiveFontSize(2.2)}}>
            {item?.card_type?.toUpperCase()}
          </H5>
          <View
            style={{
              marginLeft: wp('2%'),
              marginTop: wp('2%'),
            }}>
            <H5
              style={{fontWeight: 'bold', fontSize: responsiveFontSize(2.3)}}
              color={Color('headerIcon')}
              extraBold>{`XXXX  XXXX  XXXX  ${item.last4}`}</H5>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // marginTop: wp('8%'),
            }}>
            <View style={{flexDirection: 'column'}}>
              <Pera>Card Holder</Pera>
              <H5 style={{fontWeight: '700'}}>{Name}</H5>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Pera>Card Expiry</Pera>
              <H5 style={{fontWeight: '700'}}>{formattedExpiry}</H5>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const handlePress = item => {};

const CustomCarousel = ({
  params,
  data,
  height = defaults.height,
  width = defaults.width,
  delay = defaults.delay,
  onPress = handlePress,
  ItemElement = Item,
  onCardSelect,
  pressable = true,
}) => {
  const [selectedIndex, setselectedIndex] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [token, setToken] = useState();
  // console.log('selectedIndex', selectedIndex);
  const scrollView = useRef();
  const navigation = useNavigation();

  const setIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffset / viewSize);
    console.log(
      'Scroll offset:',
      contentOffset,
      'View width:',
      viewSize,
      'Index:',
      index,
    );
    setselectedIndex(index);
  };
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setselectedIndex(index);

    console.log(
      `Scroll offset: ${offsetX.toFixed(2)} View width: ${width.toFixed(
        2,
      )} Index: ${index}`,
    );
  };
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('signCredentials');
    const extractToken = JSON.parse(userToken);
    setToken(extractToken?.token);
  };

  useEffect(() => {
    getToken();
  }, []);
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.carousalContainer}>
          {data?.map((item, index) => {
            console.log('item', item);
            const isSelected = index === selectedIndex;

            return (
              <View>
                <ItemElement
                  navigation={navigation}
                  params={params}
                  image={item.url}
                  token={token}
                  item={item}
                  key={item.id}
                  height={height}
                  width={width}
                  isSelected={item.id === selectedCardId}
                  setSelectedCardId={setSelectedCardId}
                  onCardSelect={onCardSelect}
                  pressable={pressable}
                  {...item}
                  onPress={() => onPress(item)}
                />
                {item.id === selectedCardId && (
                  <H5
                    style={{
                      marginTop: responsiveHeight(1),
                      textAlign: 'center',
                      color: Color('text'),
                      fontWeight: '600',
                    }}>
                    Selected Payment Method
                  </H5>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Br space={2} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {data?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: hp('1.2%'),
                height: hp('1.2%'),
                borderRadius: hp('1%'),
                backgroundColor:
                  index === selectedIndex ? Color('text') : Color('ratingStar'),
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
    gap: responsiveHeight(2),
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
