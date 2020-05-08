import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstance";

export const incrementCounter = () => {
  console.log("Action incrementCounter");
  return {
    type: INCREMENT_COUNTER,
  };
};

export const decrementCounter = () => {
  console.log("Action decrementCounter");

  return {
    type: DECREMENT_COUNTER,
  };
};
