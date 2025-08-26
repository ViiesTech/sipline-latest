/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ClipboardText, Heart, Home, SearchNormal, ShoppingCart, User } from 'iconsax-react-native';
import { Color } from '../utils/Colors';
import { useNavigation } from '../utils/NavigationContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { ShowToast } from '../GlobalFunctions/ShowToast';

const NavigationBar = () => {
    const { navigate } = useNavigation();
    const { token } = useSelector(state => state?.user);
    return (
        <View style={styles.navigationBar}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigate('Home')}>
                <View style={{ backgroundColor: Color('btnBackground'), borderRadius: hp('100%') }}>
                    <Home
                        size={hp('2.5%')}
                        color={Color('text')}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigate('BarListing', { type: 'searchShops' })}>
                <View>
                    <SearchNormal size={hp('2.5%')} color={Color('text')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigate('MyCart')}>
                <View>
                    <ShoppingCart
                        size={hp('2.5%')}
                        color={Color('text')}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => token ? navigate('WishList') : navigate('AuthStack')}
                style={{ flex: 1, alignItems: 'center' }}>
                <View>
                    {/* <User
                        size={hp('2.5%')}
                        color={Color('text')}
                    /> */}
                    <Heart
                        size={hp('2.5%')}
                        color={Color('text')}
                        variant={'Outline'}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default NavigationBar;

const styles = StyleSheet.create({
    navigationBar: {
        position: 'absolute',
        bottom: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color('headerIcon'),
        width: wp('94%'),
        paddingVertical: hp('3%'),
        borderRadius: hp('1%'),
        alignSelf: 'center',
        zIndex: 1,
        shadowColor: Color('text'),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
});
