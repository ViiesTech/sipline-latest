import { ToastAndroid } from 'react-native';
import { barProfile, barProfileData } from '../../utils/LocalData';

export const BAR_LOADER = 'BAR_LOADER';
export const HOME_DATA = 'HOME_DATA';
export const BAR_LIST_DATA = 'BAR_LIST_DATA';
export const BAR_PROFILE_DETAILS = 'BAR_PROFILE_DETAILS';
export const BAR_PRODUCT_DETAILS = 'BAR_PRODUCT_DETAILS';
export const CART_ITEMS = 'CART_ITEMS';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const GET_CARDS = 'GET_CARDS';
export const APP_DATA = 'APP_DATA';
export const APPLY_COUPON_CODE = 'APPLY_COUPON_CODE';
export const CREATE_ORDER = 'CREATE_ORDER';
export const HELPER = 'HELPER';
export const ACTIVE_CARD = 'ACTIVE_CARD';


const initial_state = {
    barLoadingState: false,
    homeData: null,
    barList: null,
    selectedBarProfile: barProfile,
    productDetails: null,
    cartItems: [],
    userCard: null,
    appData: null,
    getCoupons: null,
    createOrder: null,
    helperState: {},
    activeCard: null,
};

const AllBarReducers = (state = initial_state, action) => {
    switch (action.type) {
        case BAR_LOADER:
            return {
                ...state,
                barLoadingState: false,
            };
        case HOME_DATA:
            return {
                ...state,
                homeData: {
                    ...state.homeData,
                    currentBarData: action.payload.currentBarData !== undefined
                        ? action.payload.currentBarData
                        : state.homeData.currentBarData,
                    category: action.payload.category !== undefined
                        ? action.payload.category
                        : state.homeData.category,
                    trendSearches: action.payload.trendSearches !== undefined
                        ? action.payload.trendSearches
                        : state.homeData.trendSearches,
                },
                // homeData: [...state?.homeData, action.payload]
            };
        case BAR_LIST_DATA:
            return {
                ...state,
                barList: action.payload,
            };
        case BAR_PROFILE_DETAILS:
            return {
                ...state,
                selectedBarProfile: action.payload,
            };
        case BAR_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload,
            };
        case CART_ITEMS:
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                ToastAndroid.show('Item is Already Added!', ToastAndroid.SHORT);
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                ToastAndroid.show(' Item is Added!', ToastAndroid.SHORT);
                return {
                    ...state, cartItems: [...state.cartItems, action.payload],
                };
            }
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        case GET_CARDS:
            return {
                ...state,
                userCard: action.payload,
            };
        case APP_DATA:
            return {
                ...state,
                appData: action.payload,
            };
        case APPLY_COUPON_CODE:
            return {
                ...state,
                getCoupons: action.payload,
            };
        case CREATE_ORDER:
            return {
                ...state,
                createOrder: action.payload,
            };
        case HELPER:
            return {
                ...state,
                helperState: action.payload,
            };
        case ACTIVE_CARD:
            return {
                ...state,
                activeCard: action.payload,
            };
        default:
            return state;
    }
};


export default AllBarReducers;
