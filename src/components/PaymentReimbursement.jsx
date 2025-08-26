/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';

const PaymentReimbursement = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  const [selectedMethodId, setSelectedMethodId] = useState(null);

  const data = [
    {
      id: 1,
      title: 'I would like a store voucher',
      txt: 'Receive an instant voucher to use on new orders.',
    },
    {
      id: 2,
      title: 'I want a refund',
      txt: 'We will process your refund, which may take up to 7 business days.',
    },
    {
      id: 3,
      title: 'I would like a replacement product',
      txt: 'We will replace your product with a new one.',
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
        Choose the method for receiving payment
      </Text>
      <FlatList
        data={data}
        contentContainerStyle={{
          gap: responsiveHeight(2),
          marginTop: responsiveHeight(2),
        }}
        renderItem={({item, index}) => {
          const isSelected = selectedPaymentMethod === item.title;
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedMethodId(item.id);
                setSelectedPaymentMethod(item.title);
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
                    setSelectedMethodId(item.id);
                    setSelectedPaymentMethod(item.title);
                  }}
                  style={{
                    borderWidth: isSelected ? 7 : 2,
                    borderColor: isSelected ? '#2F620B' : '#D0D5DD',

                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    borderRadius: responsiveHeight(2),
                  }}
                />
                <View style={{gap: 5, width: responsiveWidth(74)}}>
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

export default PaymentReimbursement;
