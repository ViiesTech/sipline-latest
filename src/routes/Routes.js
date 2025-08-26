import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {MainStack} from './MainStack';
import {useSelector} from 'react-redux';
import {ProfileStack} from './ProfileStack';
import Splash from '../screens/Splash';
import {useEffect, useState} from 'react';
import {useNavigation} from '../utils/NavigationContext';

const Stack = createNativeStackNavigator();

export function Routes() {
  const {token, profileCreated} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  console.log('token', token);
  // useEffect(() => {
  //   const timeout = setTimeout(() => setIsLoading(false), 1000);
  //   return () => clearTimeout(timeout);
  // }, []);
  // useEffect(() => {
  //   navigation.navigate('MainStack');
  // }, [token]);
  // if (isLoading) {
  //   return <Splash />; // while app initializes
  // }
  return (
    // <Stack.Navigator screenOptions={{headerShown: false}}>
    //   {/* {isLoading ? ( */}
    //   <Stack.Screen name="MainStack" component={MainStack} />
    //   <Stack.Screen name="Splash" component={Splash} />
    //   {/* ) : !token ? ( */}
    //   <Stack.Screen name="AuthStack" component={AuthStack} />
    //   {/* ) : !profileCreated ? ( */}
    //   <Stack.Screen name="OnboardingStack" component={ProfileStack} />
    //   {/* ) : ( */}
    //   {/* )} */}
    // </Stack.Navigator>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* MainStack hamesha available hoga */}
      <Stack.Screen name="MainStack" component={MainStack} />

      {/* AuthStack sirf tab dikhana hai jab user login na kare */}
      {/* {!token && <Stack.Screen name="AuthStack" component={AuthStack} />} */}
    </Stack.Navigator>
  );
}
