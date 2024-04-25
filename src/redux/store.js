import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./rootReducer";


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// store.subscribe(()=>{
//     console.log(store.getState(),'store');
// })
export default store;