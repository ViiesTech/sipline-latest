/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';

const ReturnReason = ({selectedProducts, returnDetails, setReturnDetails}) => {
  // const [selectedCondition, setSelectedCondition] = useState();
  // const [selectedReason, setSelectedReason] = useState();
  // const [selectedDetails, setSelectedDetails] = useState({
  //   selectedCondition: '',
  //   selectedReason: '',
  // });
  const selectedCondition = returnDetails.selectedCondition;
  const selectedReason = returnDetails.selectedReason;
  console.log('selectedProducts', selectedProducts[0].image.uri);
  // useEffect(() => {
  //   onDetailsChange(selectedDetails);
  // }, [selectedDetails, onDetailsChange]);
  const conditionData = [
    {id: 1, title: 'I would like to return a sealed product.'},
    {id: 2, title: 'I want to return an item ordered by mistake.'},
    {id: 3, title: 'The product is defective or damaged.'},
    {id: 4, title: 'I wish to return an unsealed but functional product.'},
    {id: 5, title: 'Received the wrong product.'},
  ];
  const primaryReasonData = [
    {id: 1, title: 'The product quality is unsatisfactory.'},
    {id: 2, title: 'I need to return a non-functional, unsealed product.'},
    {id: 3, title: 'I changed my mind or the product was not as expected.'},
    {id: 4, title: 'The product information was misleading.'},
    {id: 5, title: 'The product was not delivered.'},
  ];
  const handleSelectCondition = (title, id) => {
    setReturnDetails(prev => ({
      ...prev,
      selectedCondition: title,
    }));
  };

  const handleSelectReason = (title, id) => {
    setReturnDetails(prev => ({
      ...prev,
      selectedReason: title,
    }));
  };
  return (
    <View style={{marginTop: responsiveHeight(3)}}>
      <Text style={{fontSize: responsiveFontSize(2.2), fontWeight: '500'}}>
        Select the reason for your return
      </Text>
      <Text
        style={{
          fontSize: responsiveFontSize(2.1),
          marginTop: responsiveHeight(1),
        }}>
        To help us process your request quickly, please answer the following
        questions.
      </Text>
      <FlatList
        data={selectedProducts}
        horizontal
        contentContainerStyle={{gap: responsiveHeight(2)}}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: responsiveWidth(90),
                borderWidth: 2,
                borderColor: '#EAECF0',
                borderRadius: responsiveHeight(1),
                marginVertical: responsiveHeight(3),
              }}>
              <View
                style={{
                  paddingVertical: responsiveHeight(2),
                  borderBottomWidth: 2,
                  borderBottomColor: '#EAECF0',
                  backgroundColor: '#F9FAFB',
                  borderRadius: responsiveHeight(2),
                }}>
                <Text
                  style={{
                    marginLeft: responsiveHeight(2),
                    color: '#475467',
                    fontSize: responsiveFontSize(2),
                    fontWeight: '500',
                  }}>
                  Product
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: responsiveHeight(2),
                  paddingVertical: responsiveHeight(2),
                  gap: responsiveHeight(2),
                }}>
                <Image
                  style={{
                    height: responsiveHeight(11),
                    width: responsiveWidth(23),
                    borderRadius: responsiveHeight(1),
                  }}
                  // resizeMode="contain"
                  source={{uri: item?.image?.uri}}
                />
                <Text
                  style={{color: '#2A2A2A', fontSize: responsiveFontSize(2)}}>
                  {item?.name}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <Text
        style={{
          fontSize: responsiveFontSize(2.2),
          fontWeight: '500',
          color: '#101928',
        }}>
        What is the product's current condition?
      </Text>
      <FlatList
        data={conditionData}
        contentContainerStyle={{
          gap: responsiveHeight(2),
          marginTop: responsiveHeight(2),
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelectCondition(item.title, item.id)}
              style={{
                flexDirection: 'row',
                borderColor: '#2F620B',
                alignItems: 'center',
                gap: responsiveHeight(2),
              }}>
              <TouchableOpacity
                onPress={() => handleSelectCondition(item.title, item.id)}
                style={{
                  borderWidth: item.title === selectedCondition ? 7 : 2,
                  borderColor:
                    item.title === selectedCondition ? '#2F620B' : '#D0D5DD',
                  height: responsiveHeight(3),
                  width: responsiveWidth(6),
                  borderRadius: responsiveHeight(2),
                }}
              />
              <Text style={{fontSize: responsiveFontSize(2), color: '#344154'}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text
        style={{
          fontSize: responsiveFontSize(2.2),
          fontWeight: '500',
          color: '#101928',
          marginTop: responsiveHeight(4),
        }}>
        What is the primary reason for returning the product?
      </Text>
      <FlatList
        data={primaryReasonData}
        contentContainerStyle={{
          gap: responsiveHeight(2),
          marginTop: responsiveHeight(2),
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelectReason(item.title, item.id)}
              style={{
                flexDirection: 'row',
                borderColor: '#2F620B',
                alignItems: 'center',
                gap: responsiveHeight(2),
              }}>
              <TouchableOpacity
                onPress={() => handleSelectReason(item.title, item.id)}
                style={{
                  // borderWidth: item.id === selectedReason ? 7 : 2,
                  // borderColor:
                  //   item.id === selectedReason ? '#2F620B' : '#D0D5DD',
                  borderWidth: item.title === selectedReason ? 7 : 2,
                  borderColor:
                    item.title === selectedReason ? '#2F620B' : '#D0D5DD',
                  height: responsiveHeight(3),
                  width: responsiveWidth(6),
                  borderRadius: responsiveHeight(2),
                }}
              />
              <Text style={{fontSize: responsiveFontSize(2), color: '#344154'}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ReturnReason;
