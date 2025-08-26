/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {minus, tick} from '../icons';
import SvgIcons from './SvgIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive';
import {getAllOrdersByStatus, getOrderByOrderId} from '../GlobalFunctions/Apis';
import {useSelector} from 'react-redux';
import {baseUrl, imageUrl} from '../utils/Api_contents';

const YourDetails = ({
  onSelectItems,
  orderId,
  orderData,
  selectedItems,
  setSelectedItems,
}) => {
  // const [selectedItems, setSelectedItems] = useState([]);
  const {userData} = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log('data', data);
  const renderOrderHistory = async () => {
    setIsLoading(true);
    const response = await getOrderByOrderId(orderId);
    setIsLoading(false);
    if (response?.data) {
      setData(response.data); // store the raw order object
    }
  };
  useEffect(() => {
    renderOrderHistory();
  }, []);
  const toggleSelect = product => {
    setSelectedItems(prevSelected => {
      const exists = prevSelected.some(
        item => item.productId === product.productId,
      );
      // if (exists) {
      //   return prevSelected.filter(
      //     item => item.productId !== product.productId,
      //   );
      // } else {
      //   return [...prevSelected, product];
      // }
      if (exists) {
        return prevSelected.filter(
          item => item.productId !== product.productId,
        );
      } else {
        return [...prevSelected, product];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems?.length === flattenedData?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(flattenedData);
    }
  };
  useEffect(() => {
    orderData({
      adminId: data.adminId,
      orderId: data._id,
      shopId: data.shopId?._id,
      transactionId:data?.transactionId,
    });
    onSelectItems(selectedItems);
  }, [data, selectedItems]);
  const flattenedData = data?.product?.map(prod => ({
    orderId: data._id, // order id
    shopId: data.shopId?._id,
    adminId: data.adminId,
    productId: prod.productId?._id,
    name: prod.productId?.name,
    image: prod.productId?.productImages?.[0]
      ? {uri: `${imageUrl}${prod.productId.productImages[0]}`}
      : require('../assets/images/mauris.png'),
  }));
  console.log('flattened data', flattenedData);
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: responsiveFontSize(2.5),
          fontWeight: '600',
          marginTop: responsiveHeight(4),
        }}>
        Select product(s) you want to return:
      </Text>
      <View style={{flex: 1}}>
        {/* <FlatList
          data={data}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveHeight(4),
                backgroundColor: '#F9FAFB',
                borderBottomWidth: 2,
                borderBottomColor: '#EAECF0',
                padding: responsiveHeight(2),
              }}>
              <TouchableOpacity
                onPress={toggleSelectAll}
                style={{
                  backgroundColor:
                    selectedItems.length === data.length && data.length > 0
                      ? '#2F620B'
                      : null,
                  borderRadius: responsiveHeight(1),
                  borderWidth:
                    selectedItems.length === data.length && data.length > 0
                      ? null
                      : 1.5,
                  borderColor:
                    selectedItems.length === data.length && data.length > 0
                      ? null
                      : '#D0D5DD',
                  height: responsiveHeight(4.5),
                  width: responsiveWidth(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  // padding: responsiveHeight(1),
                }}>
                {selectedItems.length === data.length && data.length > 0 ? (
                  <SvgIcons xml={minus} height={20} width={20} />
                ) : null}
              </TouchableOpacity>
              <Text
                style={{
                  color: '#475467',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                }}>
                Order Number
              </Text>
            </View>
          }
          contentContainerStyle={{
            borderWidth: 1.5,
            borderColor: '#EAECF0',
            borderRadius: responsiveHeight(1),
            marginTop: responsiveHeight(2),
            gap: responsiveHeight(1.5),
            // padding: responsiveHeight(2),
          }}
          renderItem={({item, index}) => {
            const isSelected = selectedItems.some(
              selected => selected.id === item.id,
            );

            return (
              <View
                style={{
                  padding: responsiveHeight(2),
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                  borderBottomColor: '#EAECF0',
                  alignItems: 'center',
                  gap: responsiveHeight(3),
                }}>
                <TouchableOpacity
                  onPress={() => toggleSelect(item)}
                  style={{
                    backgroundColor: isSelected ? '#2F620B' : null,
                    borderWidth: isSelected ? null : 1.5,
                    borderColor: isSelected ? null : '#D0D5DD',
                    borderRadius: responsiveHeight(1),
                    height: responsiveHeight(4.5),
                    width: responsiveWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    // padding: responsiveHeight(1),
                  }}>
                  {isSelected && <SvgIcons xml={tick} height={20} width={20} />}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveHeight(2),
                  }}>
                  <Image
                    style={{
                      height: responsiveHeight(8),
                      width: responsiveWidth(20),
                    }}
                    resizeMode="contain"
                    source={item.image}
                  />
                  <Text
                    style={{
                      color: '#2A2A2A',
                      fontSize: responsiveFontSize(2.2),
                    }}>
                    {item.title}
                  </Text>
                </View>
              </View>
            );
          }}
        /> */}
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={40} color={'#000'} />
          </View>
        ) : (
          <FlatList
            data={flattenedData}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(4),
                  backgroundColor: '#F9FAFB',
                  borderBottomWidth: 2,
                  borderBottomColor: '#EAECF0',
                  padding: responsiveHeight(2),
                }}>
                <TouchableOpacity
                  onPress={toggleSelectAll}
                  style={{
                    backgroundColor:
                      selectedItems?.length === flattenedData?.length &&
                      flattenedData?.length > 0
                        ? '#2F620B'
                        : null,
                    borderRadius: responsiveHeight(1),
                    borderWidth:
                      selectedItems?.length === flattenedData?.length &&
                      flattenedData?.length > 0
                        ? null
                        : 1.5,
                    borderColor:
                      selectedItems?.length === flattenedData?.length &&
                      flattenedData?.length > 0
                        ? null
                        : '#D0D5DD',
                    height: responsiveHeight(4.5),
                    width: responsiveWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {selectedItems?.length === flattenedData?.length &&
                    flattenedData?.length > 0 && (
                      <SvgIcons xml={minus} height={20} width={20} />
                    )}
                </TouchableOpacity>

                <Text
                  style={{
                    color: '#475467',
                    fontSize: responsiveFontSize(2),
                    fontWeight: '500',
                  }}>
                  Order Number
                </Text>
              </View>
            }
            keyExtractor={(item, index) => `${item.productId}-${index}`}
            renderItem={({item}) => {
              const isSelected = selectedItems.some(
                selected => selected.productId === item.productId,
              );

              return (
                <View
                  style={{
                    padding: responsiveHeight(2),
                    flexDirection: 'row',
                    borderBottomWidth: 2,
                    borderBottomColor: '#EAECF0',
                    alignItems: 'center',
                    gap: responsiveHeight(3),
                  }}>
                  <TouchableOpacity
                    onPress={() => toggleSelect(item)}
                    style={{
                      backgroundColor: isSelected ? '#2F620B' : null,
                      borderWidth: isSelected ? null : 1.5,
                      borderColor: isSelected ? null : '#D0D5DD',
                      borderRadius: responsiveHeight(1),
                      height: responsiveHeight(4.5),
                      width: responsiveWidth(8),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {isSelected && (
                      <SvgIcons xml={tick} height={20} width={20} />
                    )}
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveHeight(2),
                    }}>
                    <Image
                      style={{
                        height: responsiveHeight(10),
                        width: responsiveWidth(22),
                        borderRadius: responsiveHeight(1),
                      }}
                      // resizeMode="contain"
                      source={item.image}
                    />
                    <Text
                      style={{
                        color: '#2A2A2A',
                        fontSize: responsiveFontSize(2.2),
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default YourDetails;
