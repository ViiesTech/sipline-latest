import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/authentication/Login';
import Signup from '../screens/authentication/Signup';
import ForgetPassword from '../screens/authentication/ForgetPassword';
import OTP from '../screens/authentication/OTP';
import ResetPassword from '../screens/authentication/ResetPassword';
import {Suspense} from 'react';
import Loading from '../screens/Loading';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();
const Sus = ({component}) => {
  return <Suspense fallback={<Loading />}>{component}</Suspense>;
};
export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
    </Stack.Navigator>
  );
}
