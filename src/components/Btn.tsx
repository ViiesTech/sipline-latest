/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { H6 } from '../utils/Text';
import { Color } from '../utils/Colors';

const Btn = ({ children,loaderSize, style, onPress, loading, disabled }: { disabled?: any, children: any, style?: any, onPress?: any,loaderSize?:string, loading?: any }) => {
    const whenClicked = () => {
        if (onPress) {
            onPress();
        }
    };
    return (
        <TouchableOpacity
            onPress={whenClicked}
            style={{
                flexGrow: 1,
                borderRadius: hp('1%'),
                paddingVertical: hp('1.5%'),
                backgroundColor: Color('headerIconBg'),
                ...style,
            }}
            disabled={disabled || loading}
        >
            {
                loading
                    ?
                    <ActivityIndicator size={loaderSize || 'large'} color={Color('headerIcon')} />
                    :
                    <H6 style={{ textAlign: 'center' }} color={Color('headerIcon')}>{children}</H6>
            }
        </TouchableOpacity>
    );
};

export default Btn;
