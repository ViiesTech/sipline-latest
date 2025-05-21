/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Image, Pressable, View } from 'react-native';
import { H4, H6, Pera } from '../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Img from '../assets/images/dummyGlass.png'

const OrderCard = ({ imageUrl, itemId,shortId, itemName, itemPrice,onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: wp('6%'),
                marginBottom: hp('1%'),
            }}>
                <Image
                    resizeMode="stretch"
                    // source={{uri:imageUrl || 'https://www.testo.com/images/not-available.jpg'}}
                    source={{uri:imageUrl}}
                    style={{ width: wp('45%'), height: wp('35%'), borderRadius: wp('3%') }}
                />
                <View style={{ width: wp('48%'), paddingVertical: hp('1%') }}>
                    <H4
                        style={{ marginBottom: hp('1%') }}
                        bold
                        numberOfLines={1}
                        medium>
                        {itemName?.replace(/\b\w/g, l => l.toUpperCase())}
                    </H4>
                    <Pera
                        style={{ marginBottom: hp('1%') }}
                        medium
                        numberOfLines={1}>
                        {`$${parseFloat(itemPrice).toFixed(2)}/-`}
                    </Pera>
                    <H6
                        style={{ marginBottom: hp('0.4%') }}
                        bold
                        numberOfLines={1}
                    >{`Order ID : ${shortId}`}</H6>
                </View>
            </View>
        </Pressable>
    );
};

export default OrderCard;
