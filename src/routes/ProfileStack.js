import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetProfilePic from '../screens/authentication/SetProfilePic';
import SelectGender from '../screens/authentication/SelectGender';
import Bio from '../screens/authentication/Bio';
import AddLocation from '../screens/authentication/AddLocation';
import Map from '../screens/authentication/Map';
import Final from '../screens/authentication/Final';
import {Suspense} from 'react';
import Loading from '../screens/Loading';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Sus = ({component}) => {
  return <Suspense fallback={<Loading />}>{component}</Suspense>;
};
export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
    </Stack.Navigator>
  );
}
