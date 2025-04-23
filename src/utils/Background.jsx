/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, Keyboard, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import KeyboardView from './KeyboardView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('screen');

const Background = ({ children, noBackground, noScroll, detectScrollEnd, onScrollEnd, Auth, flex, refreshing, onRefresh }) => {

    useEffect(() => {
        if (Auth) {hasToken();}
    }, []);

    const hasToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
            });
        }
    };

    const scrollEnd = () => {
        if (detectScrollEnd) {
            onScrollEnd();
        }
    };

    return (
        <>
            <SafeAreaView style={[styles.safeAreaView]}>
                {!noBackground && <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />}
                <View style={styles.content}>
                    <KeyboardView>
                        {
                            noScroll
                            ?
                            children
                            :
                            flex
                            ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                onScrollEndDrag={scrollEnd}
                                data={[children]}
                                renderItem={({ item }) => item}
                                keyExtractor={(item, index) => index}
                            />
                            :
                            <View>
                                <ScrollView
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    onScrollEndDrag={(e) => {
                                        const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
                                        const end = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
                                        if (end) {
                                            scrollEnd();
                                        }
                                    }}
                                    refreshControl={
                                        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
                                    }
                                >
                                    <TouchableWithoutFeedback onPress={() => {
                                        Keyboard.dismiss();
                                    }}>
                                        <View>
                                            {children}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>
                        }
                    </KeyboardView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Background;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height,
    },
    content: {
        zIndex: 1,
        flex: 1,
        paddingTop: hp('2.5%'),
    },
});
