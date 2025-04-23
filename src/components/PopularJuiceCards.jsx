/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { ImageBackground, Pressable, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { H5, Pera } from '../utils/Text';
import { StopCircle } from 'iconsax-react-native';

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
}) => {
    const handlePress = onSelect || onPress;

    return (
        <Pressable onPress={handlePress} style={{ flexGrow: 1 }}>
            {isSelected  ? (
                <StopCircle
                    color="green"
                    size={30}
                    style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
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
            <View style={{ paddingTop: hp('1%') }}>
                {isChangePosition ? (
                    <><Pera bold style={priceStyle}>{price}</Pera><H5 style={brandStyle} extraBold>{name}</H5></>
                ): (
                    <><H5 style={brandStyle} bold>{name}</H5><Pera style={priceStyle}>{price}</Pera></>
                )}
            </View>
        </Pressable>
    );
};

export default PopularJuiceCards;
