import { OPEN_MODEL, CLOSE_MODEL } from "./modelConstants";

export const openModel = (modelName, modelProps) => {
  return {
    type: OPEN_MODEL,
    payload: {
      modelName,
      modelProps,
    },
  };
};

export const closeModel = (modelName, modelProps) => {
  return {
    type: CLOSE_MODEL,
    // payload: {
    //   modelName,
    //   modelProps,
    // },
  };
};
