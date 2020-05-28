import { combineReducers } from "redux";
import eventReducer from "../../features/event/eventReducer";
import testReducer from "../../features/testarea/testReducer";
import { reducer as FormReducer } from "redux-form";
import modelReducer from "../../features/model/modelReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const RootReducer = combineReducers({
  form: FormReducer,
  tests: testReducer,
  events: eventReducer,
  models: modelReducer,
  auth: authReducer,
  async: asyncReducer,
});

export default RootReducer;
