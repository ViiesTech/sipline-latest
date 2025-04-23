/* eslint-disable no-return-assign */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
const Input = ({ leftIcon, rightIcon, inputStyle, styling, actAsButton, onPress, ...props }) => {
    const style = {
        backgroundColor: Color('headerIcon'),
        borderWidth: 1,
        borderColor: Color('text'),
        padding: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: hp('0.5%'),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        ...styling,
    };
    const textAreaStyle = {
        backgroundColor: Color('headerIcon'),
        borderWidth: 1,
        borderColor: Color('text'),
        padding: hp('1%'),
        paddingHorizontal: wp('3%'),
        overflow: 'auto',
        borderRadius: hp('0.5%'),
        ...styling,
    };
    const pressEvent = () => {
        if (onPress) {
            onPress();
        }
    };
    const WrapBtn = ({ children }) => {
        return (
            <TouchableOpacity onPress={pressEvent} style={style}>
                {children}
            </TouchableOpacity>
        );
    };
    if (actAsButton) {
        return (
            <WrapBtn>
                {leftIcon}
                <TextInput

                    style={{
                        color: Color('text'),
                        height: hp('4%'),
                        padding: 0,
                        fontFamily: 'Inter_18pt-Medium',
                        ...inputStyle,
                    }}
                    readOnly={actAsButton}
                    {...props}
                />
            </WrapBtn>
        );
    }
    if (props.multiline) {
        return (
            <View style={textAreaStyle}>
                <TextInput
                    style={{
                        color: Color('text'),
                        textAlignVertical: 'top',
                        fontFamily: 'Inter_18pt-Medium',
                        ...inputStyle,
                    }}
                    {...props}
                />
            </View>
        );
    }
    return (
        <View style={style}>
            {leftIcon}
            <TextInput
                style={{
                    color: Color('text'),
                    height: hp('4%'),
                    width: rightIcon ? wp('65%') : wp('74%'),
                    padding: 0,
                    fontFamily: 'Inter_18pt-Medium',
                    ...inputStyle,
                }}
                {...props}
            />
            {rightIcon}
        </View>
    );
};
export default Input;

