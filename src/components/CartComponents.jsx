/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {H6, Pera} from '../utils/Text';
import Br from './Br';
import Counter from './Counter';
import {Color} from '../utils/Colors';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import {useDispatch, useSelector} from 'react-redux';
import {clearProductById} from '../reduxNew/Slices';

const CartComponent = ({
  ImgUrl,
  itemTitle,
  itemPrice,
  countNumber,
  onAdd,
  onDetect,
  isCartCounter,
  id,
}) => {
  const {cartProducts} = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log('cartproducts', cartProducts);
  return (
    <View style={{flexDirection: 'row', gap: hp('2%'), marginBottom: hp('2%')}}>
      <Image
        source={{
          uri: ImgUrl,
        }}
        style={{
          height: wp('30%'),
          width: wp('40%'),
          borderRadius: hp('1%'),
        }}
      />
      <View style={{flexDirection: 'column', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}>
          <H6 bold style={{marginBottom: hp('1%'), maxWidth: '85%'}}>
            {itemTitle}
          </H6>
          <TouchableOpacity
            onPress={() => dispatch(clearProductById(id))}
            style={{
              backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              // padding: responsiveHeight(0.8),
              height: responsiveHeight(2.9),
              width: responsiveWidth(5.7),
              borderRadius: responsiveHeight(2),
            }}>
            <Pera medium style={{color: 'white', alignSelf: 'center'}}>
              X
            </Pera>
          </TouchableOpacity>
        </View>
        <Pera medium style={{marginBottom: hp('1%')}}>
          ${parseFloat(itemPrice).toFixed(2)}/-
        </Pera>
        <Br space={1} />
        {!isCartCounter && (
          <View>
            <Counter
              counterNumber={countNumber}
              handleDecrement={onAdd}
              handleIncrement={onDetect}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CartComponent;
