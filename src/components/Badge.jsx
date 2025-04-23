/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Pera } from '../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import { useState } from 'react';

const Badge = ({ isHorizontal, options, onPress }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handlePress = (index) => {
        setSelectedIndex(index);
        onPress(options[index].search);
    };

    return (
        <View style={{ marginLeft: hp('1%') }}>
            <ScrollView horizontal={isHorizontal} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: hp('1%'), flexWrap: isHorizontal ? 'nowrap' : 'wrap' }}>
                    {options?.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => handlePress(index)}
                            key={index}
                            style={{
                                shadowColor: selectedIndex === index ? Color('ratingStar') : 'transparent',
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,
                                elevation: 24,
                                backgroundColor: selectedIndex === index ? Color('ratingStar') : 'transparent',
                                borderWidth: wp('0.2%'),
                                paddingHorizontal: hp('3%'),
                                paddingVertical: hp('1%'),
                                borderRadius: hp('5%'),
                                alignItems: 'center',
                                borderColor: selectedIndex === index ? Color('ratingStar') : Color('text'),
                            }}
                        >
                            <Pera medium>{item}</Pera>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Badge;
