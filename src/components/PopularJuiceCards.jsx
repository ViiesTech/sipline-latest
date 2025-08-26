/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {H4, H5, H6, Pera} from '../utils/Text';
import {StopCircle} from 'iconsax-react-native';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {addToFavourites} from '../GlobalFunctions/Apis';
import {useNavigation} from '../utils/NavigationContext';
const PopularJuiceCards = ({
  isSelected,
  imgrUrl,
  onSelect,
  price,
  name,
  onPress,
  style,
  brandStyle,
  priceStyle,
  isChangePosition,
  brandName,
  containerStyle,
  id,
  fvrtsBy,
  isLoading,
  onHeartPress,
  onFavouriteAdded,
  showHeart = true,
}) => {
  const handlePress = onSelect || onPress;
  const {_id} = useSelector(state => state?.user?.userData);
  const {token} = useSelector(state => state?.user);
  const [loadingFavId, setLoadingFavId] = useState(null);
  const navigation = useNavigation();
  const handleAddProductToFavourites = async productId => {
    if (!token) {
      return navigation.navigate('AuthStack');
    }
    setLoadingFavId(productId); // set only this product as loading
    const response = await addToFavourites(_id, productId, 'product');
    if (response?.success) {
      // getAllProducts();
      onFavouriteAdded?.();
    }
    setLoadingFavId(null); // clear loading state
    console.log('addtofavourites', response);
  };
  return (
    <Pressable onPress={handlePress} style={[containerStyle, {flexGrow: 1}]}>
      {isSelected ? (
        <StopCircle
          color="green"
          size={30}
          style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}
          variant="Bold"
        />
      ) : null}
      <ImageBackground
        style={[
          {
            padding: wp('2%'),
            height: hp('25%'),
            borderRadius: 10,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          },
          style,
        ]}
        // source={{ uri: imgrUrl }}
        source={imgrUrl}
      />
      <View style={{paddingTop: hp('1%'), width: responsiveWidth(38)}}>
        {isChangePosition ? (
          <>
            <Pera bold style={priceStyle}>
              {price}
            </Pera>
            <H5 numberOfLines={1} style={brandStyle} extraBold>
              {name}
            </H5>
          </>
        ) : (
          <>
            {brandName && <H5 style={priceStyle}>{brandName}</H5>}
            <H6 style={brandStyle} bold>
              {name}
            </H6>
            <Pera style={priceStyle}>{price}</Pera>
          </>
        )}
      </View>
      {showHeart ? (
        <TouchableOpacity
          onPress={() => handleAddProductToFavourites(id)}
          style={{
            position: 'absolute',
            left: 8,
            top: 7,
            borderWidth: 2,
            borderColor: '#fff',
            padding: 4,
            borderRadius: responsiveHeight(2),
          }}>
          {loadingFavId === id ? (
            <View>
              <ActivityIndicator size={'small'} color={'#2f620b'} />
            </View>
          ) : (
            <Ionicons
              name={fvrtsBy?.includes(_id) ? 'heart' : 'heart-outline'}
              size={20}
              color="#2f620b"
            />
          )}
        </TouchableOpacity>
      ) : null}
    </Pressable>
  );
};

export default PopularJuiceCards;
