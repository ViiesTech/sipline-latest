/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Sheet from './Sheet';
import Wrapper from '../utils/Wrapper';
import Br from './Br';
import {H6, Pera} from '../utils/Text';
import Btn from './Btn';
import MapMenuCheckBox from './MapMenuCheckBox';
import {Color} from '../utils/Colors';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import {useNavigation} from '../utils/NavigationContext';
import {clearLocation, setCurrentLocation} from '../reduxNew/Slices';
import {
  CreateProfile,
  getAllLocations,
  selectLocation,
} from '../GlobalFunctions/Apis';
import Entypo from 'react-native-vector-icons/Entypo';
import {ShowToast} from '../GlobalFunctions/ShowToast';
const ConfirmLocationModal = ({open, setOpen}) => {
  const {_id} = useSelector(state => state.user.userData);
  const myLocations = useSelector(state => state.user.myLocations);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const {currentLocation, userData, token, locationAdded} = useSelector(
    state => state.user,
  );
  const [locationId, setLocationId] = useState();
  const [allLocations, setAllLocations] = useState();
  const data = [
    {id: 1, title: 'Home'},
    {id: 2, title: 'Office'},
    {id: 3, title: 'Gym'},
    {id: 4, title: 'University'},
  ];
  console.log('_id', _id);
  const filteredData = data.filter(
    item => !myLocations.some(location => location.category === item.title),
  );
  console.log('filteredData', filteredData);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getAllLocationsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllLocations(_id);
      setIsLoading(false);

      console.log('resssponse', response.data);
      if (!response?.success) {
        return ShowToast('error', response.msg);
      }
      setAllLocations(response.data);
    } catch (error) {
      setIsLoading(false);
      token ? ShowToast('error', error?.response?.data?.msg) : null;
    }
  };
  useEffect(() => {
    getAllLocationsHandler();
  }, [locationAdded, token]);
  const selectLocationHandler = async locId => {
    setConfirmLoading(true);
    try {
      const response = await selectLocation(_id, locId);
      setConfirmLoading(false);
      if (response?.success) {
        ShowToast('success', 'Location Selected Successfully');
        dispatch(setCurrentLocation(response.data));
      }
    } catch (err) {
      setConfirmLoading(false);
      ShowToast('error', err?.response?.data?.msg);
    }
  };

  return (
    <Sheet open={open} setOpen={setOpen} height={hp('80%')}>
      <Wrapper x={1}>
        <Br space={2} />
        <TouchableOpacity
          onPress={() => setOpen(false)}
          style={{
            backgroundColor: '#3F7000',
            alignSelf: 'flex-end',
            height: responsiveHeight(4), // increase
            width: responsiveHeight(4), // use same for square button
            alignItems: 'center',
            borderRadius: responsiveHeight(2),
            justifyContent: 'center',
            padding: responsiveHeight(0.5),
          }}>
          <Entypo name="cross" size={25} color={'#fff'} />
        </TouchableOpacity>
        <Br space={1} />
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
            {/* {currentLocation?.location?.coordinates ? ( */}
            <MapView
              mapType="terrain"
              style={{flex: 1}}
              initialRegion={{
                latitude:
                  currentLocation?.location?.coordinates[1] ||
                  37.33863451895644,
                longitude:
                  currentLocation?.location?.coordinates[0] ||
                  -121.88413309701494,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}>
              <Marker
                coordinate={{
                  latitude: currentLocation?.location?.coordinates[1],
                  longitude: currentLocation?.location?.coordinates[0],
                }}
              />
            </MapView>
            {/* // ) : (
            //   <Text>Loading Map...</Text> // or show a spinner
            // )} */}
          </View>
        </View>
        <Br space={myLocations.length ? 3 : 2} />

        <FlatList
          horizontal
          data={filteredData}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: responsiveHeight(2)}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Map', {
                  type: 'MainStack',
                  edit: false,
                  category: item.title,
                  locId: null,
                });
                setOpen(false);
              }}
              style={{
                backgroundColor: '#3F7000',
                borderRadius: responsiveHeight(1),
                padding: responsiveHeight(1),
              }}
              key={index}>
              <Pera style={{color: '#fff'}}>Add {item.title}</Pera>
            </TouchableOpacity>
          )}
        />

        <Br space={myLocations.length ? 2 : 4} />
        {allLocations?.map((area, index) => (
          <MapMenuCheckBox
            title={area?.location?.title}
            subTitle={area?.location?.locationName}
            handleSelectCategory={() => setLocationId(area?._id)}
            handleEditPress={() => {
              navigation.navigate('Map', {
                type: 'MainStack',
                edit: true,
                category: area.category,
                locId: area?._id,
              });
              setOpen(false);
            }}
            isChecked={
              locationId
                ? locationId === area._id
                : currentLocation?.location?.title === area?.location?.title
            }
          />
          // </TouchableOpacity>
        ))}

        <Br space={4} />
        {allLocations?.length ? (
          <View style={{alignItems: 'flex-end'}}>
            <Btn
              loading={isConfirmLoading}
              onPress={() => selectLocationHandler(locationId)}
              style={{width: wp('40%')}}>
              Confirm Location
            </Btn>
          </View>
        ) : null}
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
