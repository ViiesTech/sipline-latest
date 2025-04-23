import { notificationData, termsData, wishlistData } from "../../utils/LocalData";

export const IN_APP_LOADING_STATE = 'IN_APP_LOADING_STATE';
export const TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS';
export const PRIVACY_POLICY = 'PRIVACY_POLICY';
export const RETURN_POLICY = 'RETURN_POLICY';
export const DISCOUNTS_COUPONS = 'DISCOUNTS_COUPONS';
export const NOTIFICATION_LIST = 'NOTIFICATION_LIST';
export const ORDER_HISTORY = 'ORDER_HISTORY';
export const SELECTED_ORDER_STATUS = 'SELECTED_ORDER_STATUS';
export const WISH_LIST = 'WISH_LIST';
// export const ADD_REMOVE_WISH_LIST = 'ADD_REMOVE_WISH_LIST';

const initial_state = {
    loadingState: false,
    privacyText: termsData,
    termsCondition: termsData,
    returnPolicy: termsData,
    allDiscountCoupons: [],
    allNotificationList: [],
    allOrderHistory:[],
    orderStatus:null,
    wishList:wishlistData,
}

const AllUserReducers = (state = initial_state, action) => {
    switch (action.type) {
        case IN_APP_LOADING_STATE:
            return {
                ...state,
                loadingState: false,
            };
        case PRIVACY_POLICY:
            return {
                ...state,
                privacyText: action.payload
            };
        case TERMS_AND_CONDITIONS:
            return {
                ...state,
                termsCondition: action.payload
            };
        case RETURN_POLICY:
            return {
                ...state,
                returnPolicy: action.payload
            };
        case DISCOUNTS_COUPONS:
            return {
                ...state,
                allDiscountCoupons: action.payload
            };
        case NOTIFICATION_LIST:
            return {
                ...state,
                allNotificationList: action.payload
            };
        case ORDER_HISTORY:
            return{
                ...state,
                allOrderHistory:action.payload
            }
        case SELECTED_ORDER_STATUS:
            return{
                ...state,
                orderStatus:action.payload
            } 
        case WISH_LIST:
            return{
                ...state,
                wishList:action.payload
            }       
        default:
            return state;
    }
}


export default AllUserReducers;