import { INCREMENT_COUNER, DECREMENT_COUNTER } from "./testConstance";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
  data: 10,
};

//! Here where we Change the State
// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNER:
//       return { ...state, data: state.data + 1 };
//     case DECREMENT_COUNTER:
//       return { ...state, data: state.data - 1 };
//     default:
//       return state;
//   }
// };

//! Alternative way
const incrementCounter = (state) => {
  return { ...state, data: state.data + 1 };
};

const decrementCounter = (state) => {
  return { ...state, data: state.data - 1 };
};

export default createReducer(initialState, {
  [INCREMENT_COUNER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
});
