import { combineReducers } from "redux";
import eventReducer from "../../features/event/eventReducer";
import testReducer from "../../features/testarea/testReducer";
import { reducer as FormReducer } from "redux-form";
const RootReducer = combineReducers({
  form: FormReducer,
  tests: testReducer,
  events: eventReducer,
});

export default RootReducer;
