import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";
import {listReducer} from './list/listReducer';
import {movieReducer} from './movieDetail/movieReducer'
export default combineReducers({
  user: userReducer,
  list:listReducer,
  movie:movieReducer
});
