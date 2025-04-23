import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACTIVE_CARD,
  APP_DATA,
  APPLY_COUPON_CODE,
  BAR_LIST_DATA,
  BAR_LOADER,
  BAR_PRODUCT_DETAILS,
  BAR_PROFILE_DETAILS,
  CART_ITEMS,
  GET_CARDS,
  HELPER,
  HOME_DATA,
  UPDATE_CART_QUANTITY,
} from '../Reducer/BarReducers';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_contents';
import axios from 'axios';
import { encryption, getCardType, getServiceType, Message } from '../../utils/Alert';
import { ToastAndroid } from 'react-native';



//All Actions And API call related to bars.
//Home Data API
export const handleHomeData = (isLoader) => {

  return async (dispatch) => {
    dispatch({ type: BAR_LOADER, payload: isLoader?.checkLoader ? false :  true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(
        `${baseUrl}${endPoints.home}?city=${extractToken?.city?.toLowerCase()}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: HOME_DATA, payload: { 'category': res.data?.data[0], 'currentBarData': res.data?.data[1], 'trendSearches': res.data?.data[2] } });
      dispatch({ type: BAR_LOADER, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: BAR_LOADER, payload: false });
    }
  };
};

//Home Filter Data API
export const handleHomeFilterData = (search, navigation) => {
  return async (dispatch) => {
    dispatch({ type: BAR_LOADER, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(
        `${baseUrl}${endPoints.homeSearch}?city=${extractToken?.city?.toLowerCase()}&&q=${search?.toLowerCase()}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: HOME_DATA, payload: { 'currentBarData': res.data?.data } });
      navigation?.navigate('Home');
      dispatch({ type: BAR_LOADER, payload: false });
    } catch (error) {
      errHandler(error);
      dispatch({ type: BAR_LOADER, payload: false });
    }
  };
};




//Bar list API
export const handleBarLists = (pageIndex) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(
        `${baseUrl}${endPoints.barList}?city=${extractToken?.city?.toLowerCase()}&&page=${pageIndex}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: BAR_LIST_DATA, payload: { 'barData': res?.data?.data[0], 'lastPage': res?.data?.data[1] } });


    } catch (error) {
      errHandler(error);
    }
  };
};


// Bar Profile Details
export const handleBarProfileDetails = (bar_id) => {
  return async (dispatch) => {
    // dispatch({ type: BAR_LOADER, payload: true });
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.selectedBarDetails}?id=${bar_id}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: BAR_PROFILE_DETAILS, payload: res.data?.data });
      // dispatch({ type: BAR_LOADER, payload: false});
    } catch (error) {
      errHandler(error);
      // dispatch({ type: BAR_LOADER, payload: false });
    }
  };
};

// Bar product details
export const handleProductDetails = (product_id) => {
  return async (dispatch) => {

    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.barProductDetails}?id=${product_id}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: BAR_PRODUCT_DETAILS, payload: res.data?.data });
    } catch (error) {
      errHandler(error);
    }
  };
};


// Add item to the cards
export const handleCartItems = (item, productId, barId) => {
  return (dispatch) => {
    dispatch({
      type: CART_ITEMS,
      payload: {
        id: item.variant_id,
        name: item.brand_name,
        product_name: item.product_name,
        price: item?.price,
        after_price: item?.after_price,
        images: item.product_images,
        available: item.is_in_stock,
        quantity: 0,
        maxQuantity: item?.stock_quantity,
        productId: productId,
        barId: barId,
      },
    });
  };
};

//Update items Quantity of selected card
export const updateCartQuantity = (itemId, quantity) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      payload: {
        id: itemId,
        quantity,
      },
    });
  };
};

// get cards
export const handleCards = () => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.cards}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: GET_CARDS, payload: res.data?.data });
    } catch (error) {
      errHandler(error);
    }
  };
};

// add users card
export const handleAddCard = (card, setLoading, navigation) => {
  return async (dispatch) => {
    try {
      const type = await getCardType(card?.card_number);
      const service = await getServiceType(card?.card_number);
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.post(`${baseUrl}${endPoints.addCard}`, {
        card_type: type,
        card_service: service,
        card_number: encryption(card?.card_number, extractToken?.token),
        owner_name: encryption(card?.owner.toString(), extractToken?.token),
        expiry: encryption(card?.expiry, extractToken?.token),
        cvv: encryption(card?.cvv, extractToken?.token),
      },
        {
          headers: { Authorization: `Bearer ${extractToken?.token}` },
        });
      Message(res.data?.title, res.data?.message);
      setLoading(false);
      dispatch(handleCards());
      navigation.goBack();
    } catch (error) {
      errHandler(error);
      setLoading(false);
    }
  };
};

//delete Card
export const handleDeleteCard = (id, setLoading, navigation) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.delete(
        `${baseUrl}${endPoints.deleteCard}?id=${id}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      setLoading(false);
      Message(res.data?.title, res.data?.message);
      dispatch(handleCards());
      navigation?.goBack();
    } catch (error) {
      errHandler(error);
      setLoading(false);
    }
  };
};


// Get Discounts and App data
export const handleTotalAmount = () => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.appData}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });
      dispatch({ type: APP_DATA, payload: res?.data?.data });
    } catch (error) {
      errHandler(error);
    }
  };
};


// Get Coupons of users
export const handleCoupons = (couponCode, barId) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.get(`${baseUrl}${endPoints.applyCouponCode}?coupon_code=${couponCode}&&bar_id=${barId}`, {
        headers: {
          Authorization: `Bearer ${extractToken?.token}`,
        },
      });

      ToastAndroid.show(res.data?.message, ToastAndroid.SHORT);
      dispatch({ type: APPLY_COUPON_CODE, payload: res?.data?.data });
    } catch (error) {
      errHandler(error);
    }
  };
};


// Create Order for
export const handleCreateOrder = (coupon, couponId, barId, products, cardId, subTotal, grandTotal, salesTax, platformCharges, setLoading, navigation) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.post(`${baseUrl}${endPoints.createOrder}`, {
        'coupon_id': couponId || null,
        'bar_id': barId,
        'products': JSON.stringify(products),
        'card_id': cardId,
        'sub_total': subTotal,
        'grand_total': grandTotal,
        'sales_tax': salesTax,
        'platform_charges': platformCharges,
      },
        {
          headers: { Authorization: `Bearer ${extractToken?.token}` },
        });
      Message(res.data?.title, res.data?.message);
      setLoading(false);
      const orderCreatedData = {
        order_id: res.data?.data?.order_id,
        sub_total: subTotal,
        grand_total: grandTotal,
        sales_tax: salesTax,
        platform_charges: platformCharges,
        coupon: coupon,
      };
      navigation.replace('OrderPreparing', {
        data: orderCreatedData,
      });
    } catch (error) {
      errHandler(error);
      setLoading(false);
    }
  };
};


// Helping Resources for Different usage to make order
export const handleHelperGame = (barProfileId, cardId) => {
  return (dispatch) => {
    dispatch({
      type: HELPER, payload: {
        barProfileId: barProfileId || null,
        selectedCardId: cardId || null,
      },
    });
  };
};


// Select the card fot payments
export const handleActiveCard = (cardId, navigation) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTIVE_CARD, payload: cardId });
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      const res = await axios.put(`${baseUrl}${endPoints.activeCard}`, {
        id: cardId,
      },
      {
        headers: { Authorization: `Bearer ${extractToken?.token}` },
      });
      ToastAndroid(res.data?.title, ToastAndroid.SHORT);
    } catch (error) {
      errHandler(error);
    }
  };
};


// Remove or Add  oN Wish Lists
export const handleAddRemoveWishBar = (barId) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('signCredentials');
      const extractToken = JSON.parse(userToken);
      await axios.post(`${baseUrl}${endPoints.addRemoveWishBar}`, {
        bar_id: barId,
      },
        {
          headers: { Authorization: `Bearer ${extractToken?.token}` },
        });
    } catch (error) {
      errHandler(error);
    }
  };
};
