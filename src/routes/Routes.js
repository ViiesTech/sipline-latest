import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {MainStack} from './MainStack';
import {useSelector} from 'react-redux';
import {ProfileStack} from './ProfileStack';

const Stack = createNativeStackNavigator();

export function Routes() {
  const {token, profileCreated} = useSelector(state => state.user);
  console.log('token', token);
  console.log('profile created', profileCreated);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!token ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : !profileCreated ? (
        <Stack.Screen name="OnboardingStack" component={ProfileStack} />
      ) : (
        <Stack.Screen name="MainStack" component={MainStack} />
      )}
    </Stack.Navigator>
  );
}
