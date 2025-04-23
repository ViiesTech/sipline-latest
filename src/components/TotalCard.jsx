/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { Color } from '../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Pera } from '../utils/Text';
import HorizontalLine from '../utils/HorizontalLine';

const TotalCard = ({ beforeTotal, ...style }) => {
    return (
        <View style={{ backgroundColor: Color('headerIcon'), marginTop: hp('5%'), paddingHorizontal: wp('5%'), padding: wp('4%'), borderWidth: wp('0.2%'), borderColor: Color('mapSearchBorder'), borderRadius: hp('0.2%'), ...style }}>
            {
                beforeTotal?.map((val, index) => {
                    if (val.line) {
                        return <HorizontalLine lineStyle={{ borderColor: Color('mapSearchBorder'), marginBottom: hp('1.5%') }} />;
                    }
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp('2.5%') }}>
                            <Pera>{val.label}</Pera>
                            <Pera bold numberOfLines={1}>{val.value}</Pera>
                        </View>
                    );
                })
            }
        </View>
    );
};

export default TotalCard;
