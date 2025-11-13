/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import Br from '../components/Br';
import {H3, H4, H6, Pera} from '../utils/Text';
import PopularJuiceCards from '../components/PopularJuiceCards';
import Btn from '../components/Btn';
import {useEffect, useState} from 'react';
import {LoadingAnimation, Message} from '../utils/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleCartItems,
  handleProductDetails,
} from '../redux/Actions/BarActions';
import {baseUrl, imageUrl} from '../utils/Api_contents';
import Background from '../utils/Background';
import {allProductMaterialDummyData} from '../utils/LocalData';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import {setAdminId, setCartProducts} from '../reduxNew/Slices';
import {ShowToast} from '../GlobalFunctions/ShowToast';

const ProductDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  // const allProductMaterial = useSelector((state) => state.bars);
  const allProductMaterial = allProductMaterialDummyData;
  const [variantData, setVariantData] = useState();
  const [imagPath, setImagPath] = useState();
  const [loader, setLoader] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const {token} = useSelector(state => state?.user);
  const reduxAdminId = useSelector(state => state.user.adminId);
  const {
    productImages,
    price,
    brandName,
    shopId,
    StockQuantity,
    adminId,
    name,
    _id,
    variants,
  } = route?.params?.item;
  console.log('shopId', shopId);
  const baseProduct = {
    _id, // Important for key & selection logic
    productImages,
    price,
    adminId,
    brandName,
    shopId,
    name,
    isBase: true, // Optional: to distinguish it later if needed
    StockQuantity,
  };

  // ✅ Combine base + variants into one array
  const enrichedVariants = (variants || []).map(variant => ({
    ...variant,
    shopId, // ✅ Set shopId from route.params.item
  }));
  const combinedData = [baseProduct, ...enrichedVariants];
  console.log('combinedData', combinedData);
  const {cartProducts} = useSelector(state => state.user);
  // useEffect(() => {
  //   dispatch(handleProductDetails(route.params.id));
  // }, []);

  useEffect(() => {
    if (allProductMaterial?.productDetails?.length) {
      setVariantData(allProductMaterial?.productDetails[0].variations);
      setImagPath(
        allProductMaterial?.productDetails[0]?.product_images?.replace(
          /[\[\]']+/g,
          '',
        ),
      );
      setLoader(false);
    }
  }, [allProductMaterial]);

  const Content = ({children}) => {
    const Nodge = () => {
      return (
        <View
          style={{
            marginVertical: hp('1%'),
            width: wp('20%'),
            height: hp('0.7%'),
            backgroundColor: Color('modelBackground'),
            borderRadius: 10,
            alignSelf: 'center',
          }}
        />
      );
    };
    return (
      <View style={{transform: [{translateY: -hp('4%')}]}}>
        <View
          style={{
            overflow: 'hidden',
            borderTopLeftRadius: hp('3%'),
            borderTopRightRadius: hp('3%'),
            height: responsiveHeight(65),
            backgroundColor: 'white',
          }}>
          {/* <ImageBackground
            style={{
              borderTopLeftRadius: hp('3%'),
              borderTopRightRadius: hp('3%'),
              height: hp('70%'),
            }}
            source={require('../assets/images/sheet_background.png')}
            resizeMode="stretch"> */}
          <View
            style={{
              borderTopLeftRadius: hp('3%'),
              borderTopRightRadius: hp('3%'),
              height: responsiveHeight(65),

              // height:responsiveHeight(60),
              // height: hp('70%'),
            }}>
            <Nodge />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View>
                {children}
                <Br space={5} />
              </View>
            </ScrollView>
          </View>
          {/* </ImageBackground> */}
        </View>
      </View>
    );
  };

  const addCart = cartDetail => {
    dispatch(
      handleCartItems(
        cartDetail,
        allProductMaterial?.productDetails[0]?.product_id,
        route?.params?.barId,
      ),
    );
  };

  const toggleSelection = item => {
    setSelectedItems(prevSelected => {
      const exists = prevSelected.find(i => i._id === item._id);
      if (exists) {
        // Remove if already selected
        return prevSelected.filter(i => i._id !== item._id);
      } else {
        // Add new item with quantity: 1
        return [...prevSelected, {...item, quantity: 1}];
      }
    });
  };
  const handleAddToCart = () => {
    if (!token) {
      // return ShowToast('error', 'Please log in to continue with this action.');
      return navigation.navigate('AuthStack');
    }
    if (selectedItems.length < 1) {
      return ShowToast('error', 'Please Select a Product To Proceed');
    }
    // Filter out products that already exist in the Redux cart
    // const newItems = selectedItems.filter(
    //   selected => !cartProducts.some(cartItem => cartItem._id === selected._id),
    // );

    const newItems = selectedItems
      .filter(
        selected =>
          !cartProducts.some(cartItem => cartItem._id === selected._id),
      )
      .map(item => ({
        ...item,
        shopId, // ensure shopId is attached
        quantity: item.quantity || 1, // ensure quantity exists
      }));
    console.log('newitems', newItems);
    // Merge existing cart + new unique items
    const updatedCart = [...cartProducts, ...newItems];
    console.log('cartProducts', cartProducts);
    // Dispatch merged result
    if (reduxAdminId) {
      if (reduxAdminId !== adminId) {
        return ShowToast(
          'error',
          'Clear your cart to add items from another shop.',
        );
      }
    }
    dispatch(setCartProducts(updatedCart));
    dispatch(setAdminId(adminId));
    navigation.navigate('MyCart');
  };
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {loader ? (
        <Background>
          <LoadingAnimation />
        </Background>
      ) : (
        <>
          <ImageBackground
            // source={{ uri: allProductMaterial?.productDetails ? `${baseUrl}/customer/products/${imagPath}` : 'https://lasinfoniavietnam.com/wp-content/uploads/2023/06/Terraco-view-1.jpg' }}
            source={{uri: `${imageUrl}${productImages[0]}`}}
            style={{height: responsiveHeight(37)}}>
            <Wrapper
              x={2}
              style={{backgroundColor: Color('modelBackground'), flexGrow: 1}}>
              <View style={{flexGrow: 1}}>
                <Br space={5} />
                <Header
                  navigation={navigation}
                  withBack
                  onlyTitle
                  title="Product Details"
                  titleColor={Color('headerIcon')}
                />
              </View>
              <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
                <H3 color={Color('headerIcon')} bold>
                  {brandName}
                </H3>
                <H6 color={Color('headerIcon')}>{name}</H6>
                <View style={styles.pricesContainer}>
                  <H6 color={Color('headerIcon')}>
                    {' '}
                    {price ? `$${parseFloat(price).toFixed(2)}` : '$0'}{' '}
                  </H6>
                  {/* <H6
                    color={Color('inputIcons')}
                    style={{textDecorationLine: 'line-through'}}>
                    {allProductMaterial?.productDetails
                      ? `$${parseFloat(
                          allProductMaterial?.productDetails[0].price,
                        ).toFixed(2)}`
                      : '$0'}
                  </H6> */}
                  <Br space={8.5} />
                </View>
              </View>
            </Wrapper>
          </ImageBackground>
          <Content>
            <Wrapper x={2}>
              <H4 style={styles.variationText} bold>
                Variations
              </H4>
              <H4 style={{marginVertical: responsiveHeight(1.5)}} bold>
                Tap any product to select it.
              </H4>
            </Wrapper>
            <Br space={1} />
            <View style={{paddingLeft: wp('6%')}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={combinedData}
                keyExtractor={(item, index) => item?._id || index.toString()}
                contentContainerStyle={{gap: hp('2%')}}
                renderItem={({item}) => {
                  const isSelected = selectedItems.some(
                    i => i._id === item._id,
                  ); // check from full item list

                  return (
                    <PopularJuiceCards
                      key={item?._id}
                      style={{
                        padding: 0,
                        width: responsiveWidth(38),
                        height: responsiveHeight(15),
                        borderRadius: 10,
                      }}
                      showHeart={false}
                      imgrUrl={{uri: `${imageUrl}${item?.productImages[0]}`}}
                      name={item?.name}
                      price={`$${parseFloat(item?.price).toFixed(2)}/-`}
                      isSelected={isSelected}
                      isChangePosition={false}
                      onPress={() => {
                        toggleSelection(item);
                      }}
                    />
                  );
                }}
              />
            </View>
            <Br space={3} />
            {/* {variants?.length > 0 && ( */}

            {/* // )} */}
            <Wrapper x={2}>
              <Br space={2} />
              <View
                style={{
                  alignItems: 'center',
                  marginTop: hp('7%'),
                }}>
                <Btn onPress={handleAddToCart} style={{width: wp('80%')}}>
                  Add to Cart
                </Btn>
              </View>
              <Br space={2} />
            </Wrapper>
          </Content>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pricesContainer: {
    flexDirection: 'row',
    gap: wp('3%'),
  },
  variationText: {
    marginTop: hp('2%'),
  },
  Counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp('4%'),
  },
  mainCounterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterAction: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('1%'),
    backgroundColor: Color('headerIcon'),
  },
});

export default ProductDetails;
