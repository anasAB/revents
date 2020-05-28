import { createReducer } from "../../app/common/util/reducerUtil";
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from "./asyncConstans";

const initialState = {
  loading: false,
  elementName: null, //! its will hold the button name that was cliked
};

export const asyncActionsStarted = (state, payload) => {
  return { ...state, loading: true, elementName: payload };
};

export const asyncActionsFinished = (state) => {
  return { ...state, loading: false, elementName: null };
};

export const asyncActionsFailed = (state) => {
  return { ...state, loading: false, elementName: null };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionsStarted,
  [ASYNC_ACTION_FINISH]: asyncActionsFinished,
  [ASYNC_ACTION_ERROR]: asyncActionsFailed,
});
