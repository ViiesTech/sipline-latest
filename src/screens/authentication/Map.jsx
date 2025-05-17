/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */

import React, {useEffect, useRef, useState} from 'react';
import {H5, Pera} from '../../utils/Text';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../components/Br';
import {
  Keyboard,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../../utils/Colors';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {ArrowLeft2, Gps, Location} from 'iconsax-react-native';
import Btn from '../../components/Btn';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ApiKey} from '../../utils/Api_contents';
import Geocoder from 'react-native-geocoding';

const Map = ({navigation, route}) => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    address: null,
  });
  const mapRef = useRef();
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [searchText, setSearchText] = useState('');
  console.log('route', route.params);
  Geocoder.init(ApiKey);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Current Location:', latitude, longitude);
        fetchAddressAndSetLocation(latitude, longitude);
      },
      error => {
        console.warn('Location error:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const fetchAddressAndSetLocation = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        const address = json.results[0].formatted_address;
        console.log('Address:', address);
        setLocation({
          latitude,
          longitude,
          address,
        });
      })
      .catch(error => console.warn('Geocoding error:', error));
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'SipLine App',
          message: 'Sipline App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          pos => {
            const crd = pos.coords;
            setLocation({
              latitude: crd.latitude,
              longitude: crd.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });
          },
          err => {
            console.log(err);
          },
        );
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const ConfirmLocation = () => {
    return (
      <View
        style={{
          backgroundColor: Color('headerIcon'),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderWidth: 1,
          borderColor: Color('inputIcons'),
          padding: hp('3%'),
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1,
          width: wp('100%'),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                backgroundColor: Color('headerIconBg'),
                padding: hp('1.5%'),
                borderRadius: 100,
              }}>
              <Location
                size={hp('2.2%')}
                color={Color('headerIcon')}
                variant="Bold"
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <H5 bold>Street Empire</H5>
            <Pera style={{}}>{location.address}</Pera>
          </View>
        </View>
        <Br space={4} />
        <Btn
          onPress={() =>
            navigation.navigate('AddLocation', {
              ...route.params,
              locationSelected: true,
              lat: location.latitude,
              lng: location.longitude,
              address: location.address,
            })
          }>
          Confirm Location
        </Btn>
      </View>
    );
  };
  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000, // duration in ms
      );
    }
  }, [location]);
  //   if (!location) {
  //     return <View />;
  //   }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          //   alignItems: 'center',
          position: 'absolute',
          top: hp('8%'),
          left: wp('5%'),
          width: wp('88%'),
          zIndex: 1,
        }}>
        <TouchableOpacity
          // onPress={serchApi}
          onPress={() => navigation.goBack()}>
          <View
            style={{
              backgroundColor: Color('headerIconBg'),
              padding: hp('0.8%'),
              borderRadius: 100,
              marginTop: 5,
            }}>
            <ArrowLeft2 size={hp('3%')} color={Color('headerIcon')} />
          </View>
        </TouchableOpacity>
        {/* <TextInput
          style={{
            backgroundColor: Color('headerIcon'),
            color: Color('text'),
            flexGrow: 1,
            paddingHorizontal: wp('4%'),
            fontFamily: 'Inter_18pt-Medium',
            borderColor: Color('mapSearchBorder'),
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder="Search"
          onChangeText={text => setSearchText(text)}
        /> */}
        <GooglePlacesAutocomplete
          // Required props
          placeholder="Search"
          query={{
            key: ApiKey, // REPLACE WITH YOUR ACTUAL API KEY
            language: 'en',
            //   types: 'geocode',
          }}
          // All other default props explicitly defined
          autoFillOnNotFound={false}
          currentLocation={false}
          currentLocationLabel="Current location"
          debounce={400}
          disableScroll={false}
          enableHighAccuracyLocation={true}
          enablePoweredByContainer={true}
          fetchDetails={true}
          filterReverseGeocodingByTypes={[]}
          isRowScrollable={true}
          keyboardShouldPersistTaps="always"
          listUnderlayColor="#c8c7cc"
          listViewDisplayed="auto"
          keepResultsAfterBlur={false}
          minLength={1}
          onFail={error => {
            console.log('error', error);
          }}
          onNotFound={() => {}}
          onPress={(data, details = null) => {
            if (details) {
              const lat = details.geometry.location.lat;
              const lng = details.geometry.location.lng;
              const address = details.formatted_address || data.description;

              setLocation({
                latitude: lat,
                longitude: lng,
                address: address,
              });

              console.log('Coordinates:', lat, lng);
              console.log('Address:', address);
            }
          }}
          onTimeout={() =>
            console.warn('google places autocomplete: request timeout')
          }
          predefinedPlaces={[]}
          predefinedPlacesAlwaysVisible={false}
          styles={{}}
          suppressDefaultStyles={false}
          textInputHide={false}
          textInputProps={{}}
          timeout={20000}
        />
      </View>
      <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
        <MapView
          ref={mapRef}
          mapType="terrain"
          style={{height: '100%', width: '100%'}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={e => {
            const {latitude, longitude} = e.nativeEvent.coordinate;
            console.log('Pressed coordinates', latitude, longitude);
            fetchAddressAndSetLocation(latitude, longitude);

            mapRef.current?.animateToRegion(
              {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              1000,
            );
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="User Location"
            description="Here we are at the moment!"
          />
        </MapView>

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: location.address ? hp('25%') : hp('5%'),
            zIndex: 100,
            right: wp('7%'),
            backgroundColor: Color('headerIcon'),
            padding: hp('2%'),
            borderRadius: 100,
            shadowColor: Color('text'),
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 5,
          }}
          onPress={() => getCurrentLocation()}>
          <Gps size="32" color={Color('text')} variant="Bold" />
        </TouchableOpacity>
        {location.address && <ConfirmLocation />}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default Map;
