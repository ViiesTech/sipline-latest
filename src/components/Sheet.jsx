/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  PanResponder,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import Br from './Br';
import { responsiveHeight } from '../utils/Responsive';

const Sheet = ({height, open, setOpen, children}) => {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (offset > 3) {
      closeSheet();
      if (offset !== 0) {
        setOffset(0);
      }
    }
  }, [offset]);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      setOffset(gestureState.dy);
    },
  });

  const closeSheet = () => {
    setOpen(false);
  };

  const Nodge = () => {
    return (
      <View
        style={{
          width: wp('20%'),
          height: hp('0.7%'),
          backgroundColor: Color('modelBackground'),
          borderRadius: 10,
          alignSelf: 'center',
        }}
      />
    );
  };

  const Inner = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            overflow: 'hidden',
            borderTopLeftRadius: hp('3%'),
            borderTopRightRadius: hp('3%'),
            height: height || hp('85%'),
          }}>
          {/* <ImageBackground
            style={{
              borderTopLeftRadius: hp('3%'),
              borderTopRightRadius: hp('3%'),
              height: height || hp('85%'),
            }}
            source={require('../assets/images/sheet_background.png')}
            resizeMode="stretch"> */}
            <View  style={{
              borderTopLeftRadius: hp('3%'),
              borderTopRightRadius: hp('3%'),
              height: height || hp('85%'),
              backgroundColor:'#fff',
            }}>
              <View
                {...panResponder.panHandlers}
                style={{paddingVertical: hp('1%')}}>
                <Nodge />
              </View>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View>
                  {children}
                  <Br space={5} />
                </View>
              </ScrollView>
            </View>
          {/* </ImageBackground> */}
        </View>
      </ScrollView>
    );
  };

  if (!visible) {
    return <></>;
  }

  return (
    <View style={{zIndex: 2}}>
      <StatusBar backgroundColor={Color('modelBackground')} />
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={true}
        onRequestClose={closeSheet}>
        <Inner />
      </Modal>
      <View style={styles.background} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: responsiveHeight(70),
    justifyContent: 'flex-end',
    position: 'relative',
  },
  shoulAlwasyOpencontainer: {
    flex: 1,
    height: hp('100%'),
    position: 'relative',
  },
  background: {
    backgroundColor: Color('modelBackground'),
    position: 'absolute',
    height: hp('100%'),
    width: wp('100%'),
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
});

export default Sheet;
