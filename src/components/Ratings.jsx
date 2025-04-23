/* eslint-disable react-native/no-inline-styles */
import { Star1 } from 'iconsax-react-native';
import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import { Pera } from '../utils/Text';

const Ratings = ({ style, ratings, color }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, ...style }}>
            <Star1
                size={hp('2.5%')}
                color={Color('ratingStar')}
                variant="Bold"
            />
             
            <Pera color={color || Color('headerIcon')}>{ratings} | Ratings</Pera>
        </View>
    );
};

export default Ratings;
