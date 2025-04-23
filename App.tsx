/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider, useNavigation } from './src/utils/NavigationContext';
import { Suspense, useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';

import Splash from './src/screens/Splash';
import Loading from './src/screens/Loading';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Terms from './src/screens/Terms';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Support from './src/screens/Support';
import Return from './src/screens/Return';
import DiscountCoupons from './src/screens/DiscountCoupons';
import Login from './src/screens/authentication/Login';
import Signup from './src/screens/authentication/Signup';
import ForgetPassword from './src/screens/authentication/ForgetPassword';
import OTP from './src/screens/authentication/OTP';
import ResetPassword from './src/screens/authentication/ResetPassword';
import SetProfilePic from './src/screens/authentication/SetProfilePic';
import SelectGender from './src/screens/authentication/SelectGender';
import Bio from './src/screens/authentication/Bio';
import AddLocation from './src/screens/authentication/AddLocation';
import Map from './src/screens/authentication/Map';
import Logout from './src/screens/Logout';
import Final from './src/screens/authentication/Final';
import BarListing from './src/screens/BarListing';
import WishList from './src/screens/WishList';
import MyOrdersList from './src/screens/MyOrdersList';
import OrderPreparing from './src/screens/OrderPreparing';
import FeedBack from './src/screens/FeedBack';
import EditProfile from './src/screens/EditProfile';
import ShopProfile from './src/screens/ShopProfile';
import ProductDetails from './src/screens/ProductDetails';
import MyCart from './src/screens/MyCart';
import Checkout from './src/screens/CheckOut';
import PaymentMethod from './src/screens/PaymentMethod';
import AddCard from './src/screens/AddCard';
import DeleteCard from './src/screens/DeleteCard';
import Search from './src/screens/Search';
import Notification from './src/screens/Notification';
import { useDispatch } from 'react-redux';
import { handleLoginPermissions } from './src/redux/Actions/AuthActions';

const Stack = createNativeStackNavigator();

function App() {
  const { navigationRef } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleLoginPermissions());
    LogBox.ignoreLogs(['Warning']);
    Orientation.lockToPortrait();
  }, []);

  const Sus = ({ component }) => {
    return <Suspense fallback={<Loading />}>{component}</Suspense>;
  };
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login">
            {props => <Sus component={<Login {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {props => <Sus component={<Signup {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="ForgetPassword">
            {props => <Sus component={<ForgetPassword {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="OTP">
            {props => <Sus component={<OTP {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="ResetPassword">
            {props => <Sus component={<ResetPassword {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="SetProfilePic">
            {props => <Sus component={<SetProfilePic {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="SelectGender">
            {props => <Sus component={<SelectGender {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Bio">
            {props => <Sus component={<Bio {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="AddLocation">
            {props => <Sus component={<AddLocation {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Map">
            {props => <Sus component={<Map {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Final">
            {props => <Sus component={<Final {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {props => <Sus component={<Home {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {props => <Sus component={<Profile {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Terms">
            {props => <Sus component={<Terms {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="PrivacyPolicy">
            {props => <Sus component={<PrivacyPolicy {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Support">
            {props => <Sus component={<Support {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Return">
            {props => <Sus component={<Return {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="DiscountCoupons">
            {props => <Sus component={<DiscountCoupons {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Logout">
            {props => <Sus component={<Logout {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="BarListing">
            {props => <Sus component={<BarListing {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="WishList">
            {props => <Sus component={<WishList {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="MyOrdersList">
            {props => <Sus component={<MyOrdersList {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="OrderPreparing">
            {props => <Sus component={<OrderPreparing {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Feedback">
            {props => <Sus component={<FeedBack {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="EditProfile">
            {props => <Sus component={<EditProfile {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="ShopProfile">
            {props => <Sus component={<ShopProfile {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="ProductDetails">
            {props => <Sus component={<ProductDetails {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="MyCart">
            {props => <Sus component={<MyCart {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Checkout">
            {props => <Sus component={<Checkout {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="PaymentMethod">
            {props => <Sus component={<PaymentMethod {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="AddCard">
            {props => <Sus component={<AddCard {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="DeleteCard">
            {props => <Sus component={<DeleteCard {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Search">
            {props => <Sus component={<Search {...props} />} />}
          </Stack.Screen>
          <Stack.Screen name="Notification">
            {props => <Sus component={<Notification {...props} />} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function MobileApp() {

  return (
    <NavigationProvider>
      <App />
    </NavigationProvider>
  );
}
