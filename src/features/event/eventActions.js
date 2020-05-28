import {
  CREAT_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENT,
} from "./eventConstants";
import {
  asyncActionFinish,
  asyncActionStart,
  asyncActionFail,
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

//! Action Creator
export const creatEvent = (event) => {
  return {
    type: CREAT_EVENT,
    payload: {
      event,
    },
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId,
    },
  };
};

export const UpdateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event,
    },
  };
};

//!fetching sampleData
export const loadEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENT, payload: { events } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log("#####ERROR#######:", error);

      dispatch(asyncActionFail());
    }
  };
};
