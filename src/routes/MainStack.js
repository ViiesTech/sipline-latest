import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Suspense, useEffect} from 'react';
import Loading from '../screens/Loading';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Terms from '../screens/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Support from '../screens/Support';
import Return from '../screens/Return';
import DiscountCoupons from '../screens/DiscountCoupons';
import Logout from '../screens/Logout';
import BarListing from '../screens/BarListing';
import WishList from '../screens/WishList';
import MyOrdersList from '../screens/MyOrdersList';
import OrderPreparing from '../screens/OrderPreparing';
import FeedBack from '../screens/FeedBack';
import EditProfile from '../screens/EditProfile';
import ShopProfile from '../screens/ShopProfile';
import ProductDetails from '../screens/ProductDetails';
import MyCart from '../screens/MyCart';
import Checkout from '../screens/CheckOut';
import PaymentMethod from '../screens/PaymentMethod';
import AddCard from '../screens/AddCard';
import DeleteCard from '../screens/DeleteCard';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Final from '../screens/authentication/Final';
import Map from '../screens/authentication/Map';
import Splash from '../screens/Splash';
import RefundProductSelect from '../screens/RefundProductSelect';
import ReturnOrder from '../screens/ReturnOrder';
import {ProfileStack} from './ProfileStack';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStack} from './AuthStack';
import {useNavigation} from '../utils/NavigationContext';
import {setProfileCreated} from '../reduxNew/Slices';
import OTP from '../screens/authentication/OTP';
import Test from '../screens/Test';

const Stack = createNativeStackNavigator();
const Sus = ({component}) => {
  return <Suspense fallback={<Loading />}>{component}</Suspense>;
};
export function MainStack() {
  const {token, profileCreated} = useSelector(state => state?.user);
  console.log('token==****=', token);
  console.log('profileCreated==****=', profileCreated);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (token) {
  //     navigation.navigate('Home');
  //   }
  // }, [token]);

  useEffect(() => {
    if (token && !profileCreated) {
      navigation.navigate('OnboardingStack');
    }
  }, [token, profileCreated]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token && !profileCreated ? (
        <Stack.Screen name="OnboardingStack" component={ProfileStack} />
      ) : null}
      <Stack.Screen name="Home">
        {props => <Sus component={<Home {...props} />} />}
      </Stack.Screen>
      <Stack.Screen name="AuthStack">
        {props => <Sus component={<AuthStack {...props} />} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {props => <Sus component={<Profile {...props} />} />}
      </Stack.Screen>
      {/* <Stack.Screen name="OnboardingStack" component={ProfileStack} /> */}
      <Stack.Screen name="OTP">
        {props => <Sus component={<OTP {...props} />} />}
      </Stack.Screen>
      <Stack.Screen name="Test">
        {props => <Sus component={<Test {...props} />} />}
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
      <Stack.Screen name="RefundProductSelect">
        {props => <Sus component={<RefundProductSelect {...props} />} />}
      </Stack.Screen>
      <Stack.Screen name="RefundProduct">
        {props => <Sus component={<ReturnOrder {...props} />} />}
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
      <Stack.Screen name="Map">
        {props => <Sus component={<Map {...props} />} />}
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
      <Stack.Screen name="Final">
        {props => <Sus component={<Final {...props} />} />}
      </Stack.Screen>
      {/* <Stack.Screen name="Final">
        {props => <Sus component={<Final {...props} />} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}
