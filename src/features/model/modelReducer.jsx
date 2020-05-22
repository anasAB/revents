import { createReducer } from "../../app/common/util/reducerUtil";
import { OPEN_MODEL, CLOSE_MODEL } from "./modelConstants";

const initialState = null;

const openModel = (state, payload) => {
  const { modelName, modelProps } = payload;
  return { modelName, modelProps };
};

const closeModel = () => {
  return null; //! will reset the State to how it was before
};

export default createReducer(initialState, {
  [OPEN_MODEL]: openModel,
  [CLOSE_MODEL]: closeModel,
});
