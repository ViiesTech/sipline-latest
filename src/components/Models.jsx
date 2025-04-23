/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Modal, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';

const Models = ({ children, visible, onClose }) => {
    if (!visible) {
        return <></>;
    }
    return (
        <>
            <View style={{
                backgroundColor: Color('modelBackgroundDark'),
                position: 'absolute',
                height: hp('100%'),
                width: wp('100%'),
                bottom: 0,
                left: 0,
                zIndex: 2,
            }} />
            <StatusBar backgroundColor={Color('modelBackgroundDark')} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => onClose(false)}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {children}
                </View>
            </Modal>
        </>
    );
};


export default Models;
