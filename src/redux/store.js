import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducers.js";
import formReducer from "./reducers/formReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
});

const store = createStore(rootReducer);

export default store;
