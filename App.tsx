/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import 'react-native-get-random-values';
import { NavigationProvider, useNavigation } from './src/utils/NavigationContext';
import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { handleLoginPermissions } from './src/redux/Actions/AuthActions';
import Toast from 'react-native-toast-message';
import { Routes } from './src/routes/Routes';
import { persistor, store } from './src/reduxNew/Store';
import { PersistGate } from 'redux-persist/integration/react';
import ReturnOrder from './src/screens/ReturnOrder';
import { SafeAreaView } from 'react-native-safe-area-context';


function App() {
  const { navigationRef } = useNavigation();

  useEffect(() => {
    // store.dispatch(handleLoginPermissions());
    LogBox.ignoreLogs(['Warning']);
    Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function MobileApp() {
  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={() => {
        store.dispatch(handleLoginPermissions()); // now store is ready
      }} loading={null} persistor={persistor}>
        <NavigationProvider >
          <App />
          <Toast />
        </NavigationProvider>
      </PersistGate>
    </Provider>
  );
}
