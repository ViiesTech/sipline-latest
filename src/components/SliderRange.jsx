import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Color } from '../utils/Colors';
const width = Dimensions.get('screen').width

const SliderRange = () => {
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);
    const multiSliderValuesChange = (values) => {
        setMultiSliderValue(values);
    };
    return (
        <View style={styles.container}>
            <MultiSlider
                values={multiSliderValue}
                onValuesChange={multiSliderValuesChange}
                sliderLength={width * 0.85}
                containerStyle={{ alignSelf: 'center' }}
                min={0}
                max={100}
                step={1}
                allowOverlap={false}
                snapped={true}
                markerStyle={{ backgroundColor: Color('text') }}
                selectedStyle={{ backgroundColor: Color('text') }}
                unselectedStyle={{ backgroundColor: Color('text') }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SliderRange;