import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import compReducer from "./compReducer";

const rootReducer = combineReducers({
  comp: compReducer,
  user: userReducer,
});

export default createStore(rootReducer);
