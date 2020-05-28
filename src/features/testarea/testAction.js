import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstance";
import { asyncActionFinish, asyncActionStart } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstans";

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

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const incrementAsync = (buttonName) => {
  return async (dispatch) => {
    //dispatch(asyncActionStart()); //!To pass the Button name we need to change it to return{typel:.., payload}
    dispatch({ type: ASYNC_ACTION_START, payload: buttonName });
    await delay(1000);
    dispatch(incrementCounter());
    dispatch(asyncActionFinish());
  };
};

export const decrementAsync = (buttonName) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: buttonName });
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(asyncActionFinish());
  };
};
