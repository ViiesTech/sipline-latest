/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { H6, Pera } from '../utils/Text';
import Br from './Br';
import Counter from './Counter';

const CartComponent = ({ ImgUrl, itemTitle, itemPrice, countNumber, onAdd, onDetect, isCartCounter }) => {
    return (
        <View style={{ flexDirection: 'row', gap: hp('2%'), marginBottom: hp('2%') }}>
            <Image
                resizeMode="contain"
                source={{ uri: ImgUrl || 'https://lasinfoniavietnam.com/wp-content/uploads/2023/06/Terraco-view-1.jpg' }}
                style={{
                    height: wp('30%'),
                    width: wp('40%'),
                    borderRadius: hp('1%'),
                }}
            />
            <View style={{ flexDirection: 'column' }} >
                <H6 bold style={{ marginBottom: hp('1%') }}>{itemTitle}</H6>
                <Pera medium style={{ marginBottom: hp('1%') }}>${parseFloat(itemPrice).toFixed(2)}/-</Pera>
                <Br space={1} />
                {!isCartCounter &&
                    <View>
                        <Counter
                            counterNumber={countNumber}
                            handleDecrement={onAdd}
                            handleIncrement={onDetect}
                        />
                    </View>
                }
            </View>
        </View>
    );
};


export default CartComponent;
