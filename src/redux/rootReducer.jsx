import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";
import {listReducer} from './list/listReducer'
export default combineReducers({
  user: userReducer,
  list:listReducer
});
