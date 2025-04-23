/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import { H3, H4, H6, Pera } from '../utils/Text';
import PopularJuiceCards from '../components/PopularJuiceCards';
import Btn from '../components/Btn';
import { useEffect, useState } from 'react';
import { LoadingAnimation, Message } from '../utils/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartItems, handleProductDetails } from '../redux/Actions/BarActions';
import { baseUrl } from '../utils/Api_contents';
import Background from '../utils/Background';
import { allProductMaterialDummyData } from '../utils/LocalData';

const ProductDetails = ({ navigation, route }) => {
    const dispatch = useDispatch();
    // const allProductMaterial = useSelector((state) => state.bars);
    const allProductMaterial = allProductMaterialDummyData;
    const [variantData, setVariantData] = useState();
    const [imagPath, setImagPath] = useState();
    const [loader, setLoader] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(handleProductDetails(route.params.id));
    }, []);

    useEffect(() => {
        if (allProductMaterial?.productDetails?.length) {
            setVariantData(allProductMaterial?.productDetails[0].variations);
            setImagPath(allProductMaterial?.productDetails[0]?.product_images?.replace(/[\[\]']+/g, ''));
            setLoader(false);
        }
    }, [allProductMaterial]);


    const Content = ({ children }) => {
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
            <View style={{ transform: [{ translateY: -hp('4%') }] }}>
                <View
                    style={{
                        overflow: 'hidden',
                        borderTopLeftRadius: hp('3%'),
                        borderTopRightRadius: hp('3%'),
                        height: hp('64%'),
                    }}
                >
                    <ImageBackground
                        style={{
                            borderTopLeftRadius: hp('3%'),
                            borderTopRightRadius: hp('3%'),
                            height: hp('64%'),
                        }}
                        source={require('../assets/images/sheet_background.png')}
                        resizeMode="stretch"
                    >
                        <View>
                            <Nodge />
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <View>
                                    {children}
                                    <Br space={5} />
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    };

    const addCart = (cartDetail) => {
        dispatch(handleCartItems(cartDetail, allProductMaterial?.productDetails[0]?.product_id, route?.params?.barId));
    };


    const toggleSelection = (variantId) => {
        setSelectedItems(prevSelected => {
            const exists = prevSelected.includes(variantId);
            if (exists) {
                return prevSelected.filter(id => id !== variantId);
            } else {
                return [...prevSelected, variantId];
            }
        });
    };

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            {loader
                ?
                <Background>
                    <LoadingAnimation />
                </Background>
                :
                <>
                    <ImageBackground
                        // source={{ uri: allProductMaterial?.productDetails ? `${baseUrl}/customer/products/${imagPath}` : 'https://lasinfoniavietnam.com/wp-content/uploads/2023/06/Terraco-view-1.jpg' }}
                        source={require('../assets/images/dummyGlass.png')}
                        style={{ height: hp('40%') }}>
                        <Wrapper x={2} style={{ backgroundColor: Color('modelBackground'), flexGrow: 1 }}>
                            <View style={{ flexGrow: 1 }}>
                                <Br space={5} />
                                <Header
                                    navigation={navigation}
                                    withBack
                                    onlyTitle
                                    title="Product Details"
                                    titleColor={Color('headerIcon')}
                                />
                            </View>
                            <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                <H3 color={Color('headerIcon')} bold>{allProductMaterial?.productDetails ? allProductMaterial?.productDetails[0].brand_name : 'Anonymous'}</H3>
                                <H6 color={Color('headerIcon')}>{allProductMaterial?.productDetails ? allProductMaterial?.productDetails[0].product_name : 'Anonymous'}</H6>
                                <View style={styles.pricesContainer}>
                                    <H6 color={Color('headerIcon')}> {allProductMaterial?.productDetails ? `$${parseFloat(allProductMaterial?.productDetails[0].after_price).toFixed(2)}` : '$0'} </H6>
                                    <H6
                                        color={Color('inputIcons')}
                                        style={{ textDecorationLine: 'line-through' }}
                                    >{allProductMaterial?.productDetails ? `$${parseFloat(allProductMaterial?.productDetails[0].price).toFixed(2)}` : '$0'}</H6>
                                    <Br space={8.5} />
                                </View>
                            </View>
                        </Wrapper>
                    </ImageBackground>
                    <Content>
                        <Wrapper x={2}>
                            <H4 style={styles.variationText} bold>Variations</H4>
                        </Wrapper>
                        <Br space={1} />
                        <View style={{ paddingLeft: wp('6%') }}>
                            {variantData?.length === 0 ?
                                <Pera style={{ textAlign: 'center' }}>No variations are added</Pera>
                                :
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    data={variantData}
                                    keyExtractor={(index) => { index; }}
                                    contentContainerStyle={{ gap: hp('2%') }}
                                    renderItem={({ item, index }) => {
                                        const imagPath = item.product_images.replace(/[\[\]']+/g, '');
                                        const isSelected = selectedItems.includes(item?.variant_id);
                                        return (
                                            <PopularJuiceCards
                                                key={index}
                                                style={{
                                                    padding: 0,
                                                    width: wp('40%'),
                                                    height: hp('15%'),
                                                    borderRadius: 10,
                                                }}
                                                // imgrUrl={item?.product_images?.length === 0 ? `${baseUrl}/customer/products/${imagPath}` : 'https://i.imghippo.com/files/oNqmr1728584671.png'}
                                                imgrUrl={require('../assets/images/dummyGlass.png')}
                                                name={item?.product_name}
                                                price={`$${parseFloat(item?.price).toFixed(2)}/-`}
                                                isSelected={isSelected}
                                                isChangePosition={false}
                                                onPress={() => { toggleSelection(item?.variant_id), addCart(item); }}
                                            />);
                                    }}
                                />

                            }
                        </View>
                        <Br space={3} />
                        {variantData?.length > 0 && (
                            <Wrapper x={2}>
                                <Br space={2} />
                                <View
                                    style={{
                                        alignItems: 'center',
                                        marginTop: hp('10%'),

                                    }}
                                >
                                    <Btn
                                        onPress={() => {
                                            // if (selectedItems?.length !== 0) {
                                                navigation.navigate('ShopProfile');
                                            // } else {
                                            //     Message('Your cart is empty!', 'Tap to select');
                                            // }
                                        }}
                                        style={{ width: wp('80%') }}
                                    >Add to Cart</Btn>
                                </View>
                                <Br space={2} />
                            </Wrapper>
                        )
                        }
                    </Content>
                </>
            }
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
