import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstance";

//! Those method will be called in the Reducers
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER,
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER,
  };
};
