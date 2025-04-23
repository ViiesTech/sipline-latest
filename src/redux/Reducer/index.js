import { createStore,combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import AuthReducers from "./AuthReducers";
import AllUserReducers from "./UsersReducers";
import AllBarReducers from "./BarReducers";

const rootReducers = combineReducers({
    auth:AuthReducers,
    inApp:AllUserReducers,
    bars:AllBarReducers
});

const configureStore = () =>{
    return createStore(rootReducers,applyMiddleware(thunk))
}

export default configureStore;