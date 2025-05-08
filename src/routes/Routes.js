import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {MainStack} from './MainStack';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
}
