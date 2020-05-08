import { INCREMENT_COUNER, DECREMENT_COUNTER } from "./testConstance";

//! Those method will be called in the Reducers
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNER,
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER,
  };
};
