/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';

const PickupMethod = ({selectedMethodName, setSelectedMethodName}) => {
  const [selectedMethod, setSelectedMethod] = useState();
  // const [selectedMethodName, setSelectedMethodName] = useState('');
  const data = [
    {
      id: 1,
      title: 'Standard Shipping - $40',
      txt: 'Send it by tomorrow',
      value: 'Standard',
    },
    {
      id: 2,
      title: 'In-store pickup - Free',
      txt: 'Send it by 10/11/2024',
      value: 'In-Store',
    },
  ];

  return (
    <View style={{marginTop: responsiveHeight(3)}}>
      <Text
        style={{
          fontSize: responsiveFontSize(2.3),
          color: '#101928',
          fontWeight: '500',
        }}>
        Choose the method for returning the product
      </Text>
      <FlatList
        data={data}
        contentContainerStyle={{
          gap: responsiveHeight(2),
          marginTop: responsiveHeight(2),
        }}
        renderItem={({item, index}) => {
          const isSelected = selectedMethodName === item.value;
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedMethod(item.id);
                setSelectedMethodName(item.value); // updates parent state
              }}
              style={{
                borderWidth: 2,
                borderColor: isSelected ? '#2F620B' : '#D0D5DD',
                padding: responsiveHeight(2),
                paddingVertical: responsiveHeight(2.5),
                borderRadius: responsiveHeight(2),
              }}>
              <View style={{flexDirection: 'row', gap: responsiveHeight(2)}}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMethod(item.id);
                    setSelectedMethodName(item.title);
                  }}
                  style={{
                    borderWidth: isSelected ? 7 : 2,
                    borderColor: isSelected ? '#2F620B' : '#D0D5DD',

                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    borderRadius: responsiveHeight(2),
                  }}
                />
                <View style={{gap: 5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#344154',
                      fontWeight: '500',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#344154',
                    }}>
                    {item.txt}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default PickupMethod;
