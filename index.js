/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as StoreProvider } from "react-redux";
import configureStore from "./src/redux/Reducer";
const store = configureStore();

const Root = () =>(
    <StoreProvider store={store}>
        <App/>
    </StoreProvider>
)

AppRegistry.registerComponent(appName, () => Root);
