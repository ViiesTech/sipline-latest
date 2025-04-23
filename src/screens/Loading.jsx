import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Color } from '../utils/Colors';
import Background from '../utils/Background';

const Loading = () => {
    return (
        <Background>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 70} color={Color('text')} />
            </View>
        </Background>
    );
};

export default Loading;
