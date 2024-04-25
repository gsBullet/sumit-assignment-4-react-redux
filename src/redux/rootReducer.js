import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import featureReducer from "./featured/featuredReducer";

const rootReducer = combineReducers({
    bookStore: bookReducer,
    featured: featureReducer
})

export default rootReducer;