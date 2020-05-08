import { combineReducers } from "redux";
import eventReducer from "../../features/event/eventReducer";
import testReducer from "../../features/testarea/testReducer";

const rootReducer = combineReducers({
  tests: testReducer,
  events: eventReducer,
});

export default rootReducer;
