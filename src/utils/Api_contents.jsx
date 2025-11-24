import {Message} from './Alert';

export const baseUrl = 'https://apiforapp.link/api/';
export const imageUrl = 'https://apiforapp.link/';
export const userBaseUrl = 'https://apiforapp.link/api/user/';
export const ApiKey = 'AIzaSyC6lQeF_RuOImyuymXem2MScGV_qKhSMG4';
// export const payCreateUrl = 'https://api.paycreategateway.com/api/v2/';
// export const payCreateUserName = '4kMBT0xOoF8Hjxoojqi8vVdh0F7EhKM0';
// export const payCreatePassword = '2211';
export const payCreateUserName = 'iLdgQCp96166pl16sAfwQath2wk9I8Xb';
export const payCreatePassword = '7766';
export const payCreateUrl = 'https://api.sandbox.paycreategateway.com/api/v2/';
export const endPoints = {
  signUp: 'user/signup',
  profileCreate: 'user/updateUser',
  genderSelection: '/api/customer/auth/select_gender',
  upateBio: '/api/customer/auth/update_bio',
  addlocation: '/api/customer/auth/update_location',
  forgetPassword: 'user/forgetPassword',
  otpVerification: 'user/verifyOTP',
  otpVerificationPass: 'user/verifyOTPForPassword',
  resetPassword: 'user/resetPassword',
  signIn: 'user/login',
  allShops: 'user/getAllShops',
  shopById: 'user/getShopById',
  privacyPolicy: '/api/customer/app/policy',
  termsCondition: '/api/customer/app/terms',
  returnPolicy: '/api/customer/app/return_policy',
  support: 'user/support',
  discountCoupon: 'user/allCoupons',
  editProfile: '/api/customer/app/edit_profile',
  notifications: 'user/getNotifications',
  notificationsRead: '/api/customer/notifications/mark_as_read',
  home: '/api/customer/app/home',
  barList: '/api/customer/bar/list',
  selectedBarDetails: '/api/customer/bar/details',
  barProductDetails: '/api/customer/product/details',
  cards: '/api/customer/payment/cards',
  addCard: '/api/customer/payment/add_card',
  deleteCard: '/api/customer/payment/delete_card',
  appData: '/api/app',
  applyCouponCode: 'user/getcoupon',
  createOrder: 'user/createOrder',
  activeCard: '/api/customer/payment/active_card',
  addRemoveWishBar: '/api/customer/bar/toggle_wishlist',
  orderHistory: 'user/allOrdersByUser',
  orderStatus: 'user/allOrdersByUser',
  orderFeedBack: '/api/customer/order/feedback',
  wishList: 'user/allFavourites',
  addReview: 'review/addReview',
  addOrRemoveWishList: 'user/addFavrouite',
  homeSearch: '/api/customer/app/home_search',
};

export const errHandler = async (err, callBack) => {
  const status = err?.response?.status;
  if (
    status === 417 ||
    status === 500 ||
    status === 406 ||
    status === 502 ||
    status === 401
  ) {
    Message(
      err.response.data?.title,
      err.response.data?.data?.error
        ? typeof err.response.data?.data?.error === 'string'
          ? err.response.data?.data?.error
          : err.response.data?.data?.error[0]
        : err.response.data?.message,
    );
  } else if (status === 404) {
    // NOT FOUND
    const calledAPI = err?.response?.config?.url;
    Message(
      'Unknown API Called',
      'Please make sure that the API (' +
        calledAPI +
        ") you're calling is already exists!",
    );
  }
  // else
  //     if (status === 511) // MALFORMED TOKEN
  //     {
  //         Toast.show('Your session has been ended!!', Toast.SHORT);
  //         RNRestart.restart();
  //     } else {
  //         if (callBack) {
  //             callBack();
  //             Toast.show('Detecting Slow Internet, Retrying...', Toast.SHORT);
  //         } else {
  //             Toast.show('Detecting Slow Internet...', Toast.SHORT);
  //         }
  //     }
};
