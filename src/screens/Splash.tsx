/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const Splash = ({ navigation }: { navigation: any }) => {
  const userData = useSelector((state) => state?.auth?.permission);
  const { token, profileCreated } = useSelector(state => state.user);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!token) {
  //       navigation.navigate('AuthStack');
  //       console.log('token is not present')
  //     } else if(!profileCreated){
  //       console.log('profile is not created')
  //       navigation.navigate('OnboardingStack');
  //     }else{
  //       navigation.navigate('MainStack');
  //       console.log('token is present')

  //     }
  //   },1000);
  // }, []);

  return (
    <View style={{
      flex: 1,
      // backgroundColor: '#282828'
    }}>
      <Image
        source={require('../assets/images/splashLogo.png')}
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
