/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const Splash = ({ navigation }: { navigation: any }) => {
  const userData = useSelector((state)=> state?.auth?.permission);

  useEffect(() => {
    setTimeout(() => {
      if (userData?.saveRemember === 'save') {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 1000);
  }, [userData]);

  return (
    <View>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.container}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});
