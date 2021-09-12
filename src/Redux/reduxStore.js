import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import profileReducer from "./profileReducer";
import transactionsReducer from "./transactionsReducer";
import appReducer from "./appReducer";

let reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  form: formReducer,
  profile: profileReducer,
  transactions: transactionsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;