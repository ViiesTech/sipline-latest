/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Modal, View, PanResponder, StyleSheet, StatusBar, Pressable, } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';

const BottomSheet = ({ isOpenFilters, updateState, children, shouldAlwaysOpen }) => {
    const [visible, setVisible] = useState(false);
    const [offset, setOffset] = useState(0);


    useEffect(() => {
        if (offset > 20) {
            updateState(false);
            if (offset !== 0) {
                setOffset(0);
            }
        }
    }, [offset]);

    useEffect(() => {
        if (shouldAlwaysOpen) {
            setVisible(true);
        } else {
            setVisible(isOpenFilters);
        }
    }, [isOpenFilters, shouldAlwaysOpen]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            setOffset(gestureState.dy);
        },
    });

    const onClose = () => {
        if (!shouldAlwaysOpen) {
            setVisible(false)
        }
    }

    const Nodge = () => {
        return (
            <View
                style={{
                    width: wp('20%'),
                    height: hp('0.7%'),
                    backgroundColor: Color('nodge'),
                    borderRadius: 10,
                    alignSelf: 'center',
                }}
            />
        )
    }


    const SheetContent = () => {
        return (

            <View style={shouldAlwaysOpen ? styles.shoulAlwasyOpencontainer : styles.container}>
                <Pressable style={styles.background} onPress={onClose} />
                <View
                    style={{
                        backgroundColor: '#EBEF72',
                        paddingVertical: hp('1%'),
                        paddingHorizontal: wp('5%'),
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: hp('85%'),
                    }}
                >
                    {
                        shouldAlwaysOpen
                            ?
                            <Nodge />
                            :
                            <View {...panResponder.panHandlers} style={{ paddingVertical: hp('1%') }}>
                                <Nodge />
                            </View>
                    }
                    {children}
                </View>
            </View>
        )
    };

    if (!visible) {
        return <></>;
    }

    return (
        <View>
            <StatusBar backgroundColor={Color('modelBackground')} />


            {
                shouldAlwaysOpen
                    ?
                    <SheetContent />
                    :
                    <Modal
                        animationType={shouldAlwaysOpen ? "none" : "slide"}
                        transparent={true}
                        visible={true}
                        onRequestClose={onClose}
                    >

                        <SheetContent />

                    </Modal>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('100%'),
        justifyContent: 'flex-end',
        position: 'relative',
    },
    shoulAlwasyOpencontainer: {
        flex: 1,
        height: hp('100%'),
        // justifyContent: 'flex-end',
        position: 'relative',
    },
    background: {
        backgroundColor: Color('modelBackground'), // dark background
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default BottomSheet;
