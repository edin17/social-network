import {combineReducers} from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import searchReducer from "./searchReducer";

const allReducers = combineReducers({
    user:userReducer,
    posts:postReducer,
    search:searchReducer
})

export default allReducers;