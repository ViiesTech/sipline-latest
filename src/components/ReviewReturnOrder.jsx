/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';

const ReviewReturnOrder = ({
  returnDetails,
  recPaymentMethod,
  selectedProducts,
  handleSubmitPress,
  isLoading,
}) => {
  const data2 = [
    {
      id: 1,
      title: 'Current state of the product:',
      txt: returnDetails?.selectedCondition,
    },
    {
      id: 2,
      title: 'Main reason for returning the product:',
      txt: returnDetails?.selectedReason,
    },
    {
      id: 3,
      title: 'Method for receiving the product:',
      txt: recPaymentMethod,
    },
  ];
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      ) : (
        <View>
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
                        height: responsiveHeight(10),
                        width: responsiveWidth(20),
                        borderRadius: responsiveHeight(1),
                      }}
                      resizeMode="contain"
                      source={{uri: item?.image?.uri}}
                    />
                    <Text
                      style={{
                        color: '#2A2A2A',
                        fontSize: responsiveFontSize(2),
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />

          <FlatList
            data={data2}
            contentContainerStyle={{gap: responsiveHeight(2)}}
            renderItem={({item, index}) => {
              return (
                <View style={{gap: 7}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      color: '#344154',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.1),
                      color: '#344154',
                      fontWeight: '700',
                    }}>
                    {item.txt}
                  </Text>
                </View>
              );
            }}
          />
          <TouchableOpacity onPress={handleSubmitPress}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                color: '#2F620B',
                fontWeight: '500',
                marginTop: responsiveHeight(2),
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReviewReturnOrder;
