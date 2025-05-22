/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Sheet from './Sheet';
import Wrapper from '../utils/Wrapper';
import Br from './Br';
import {H6} from '../utils/Text';
import Btn from './Btn';
import MapMenuCheckBox from './MapMenuCheckBox';
import {Color} from '../utils/Colors';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {responsiveHeight} from '../utils/Responsive';

const ConfirmLocationModal = ({open, setOpen}) => {
  const {latitude, longitude} = useSelector(state => state.user.userData);
  return (
    <Sheet open={open} setOpen={setOpen} height={hp('60%')}>
      <Wrapper x={1}>
        <Br space={4} />
        <H6
          extraBold
          style={{
            marginBottom: wp('2%'),
            fontWight: 'bold',
            fontSize: wp('5%'),
          }}>
          Use current location
        </H6>
        {/* <Image source={require('../assets/images/Mask.png')} style={{width: wp('92%'), height: hp('20%')}} /> */}
        <View style={styles.container}>
          {/* <MapView
                                    style={styles.map}
                                    region={{
                                        latitude: barDetails?.latitude == null ? 44.968046 : barDetails?.latitude,
                                        longitude: barDetails?.longitude == null ? -94.420307 : barDetails?.longitude,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    }}
                                /> */}
          {/* <Image source={mapImg} style={{width: wp('94%')}} />
           */}
          <View
            style={{
              flex: 1,
              width: '100%',
              borderRadius: responsiveHeight(2),
              overflow: 'hidden', // very important
            }}>
            {latitude && longitude ? (
              <MapView
                mapType="terrain"
                style={{flex: 1}}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}>
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                />
              </MapView>
            ) : (
              <Text>Loading Map...</Text> // or show a spinner
            )}
          </View>
        </View>
        <Br space={4} />
        <TouchableOpacity>
          <MapMenuCheckBox
            title={'Sweet Home'}
            subTitle={'street no 545 green valve'}
            isChecked={true}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MapMenuCheckBox
            title={'Office'}
            subTitle={'street no 545 green valve'}
            mrginTop={2}
          />
        </TouchableOpacity>
        <Br space={4} />
        <View style={{alignItems: 'flex-end'}}>
          <Btn onPress={() => setOpen(false)} style={{width: wp('40%')}}>
            Confirm Location
          </Btn>
        </View>
      </Wrapper>
    </Sheet>
  );
};

export default ConfirmLocationModal;

const styles = StyleSheet.create({
  container: {
    height: hp('18%'),
    alignItems: 'stretch',
    marginTop: wp('3%'),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
