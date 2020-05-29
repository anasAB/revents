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
import { toastr } from "react-redux-toastr";

//! Action Creator
export const creatEvent = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREAT_EVENT,
        payload: {
          event,
        },
      });
      toastr.success("Succcess!", "Event Has Been Created Successfully.. ");
    } catch (error) {
      toastr.error("Please Try Again Later", error);
    }
  };
};

export const deleteEvent = (eventId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: {
          eventId,
        },
      });
      toastr.warning("Deleted Even", "The EVENT has been deleted..!");
    } catch (error) {
      toastr.error("Please Try Again Later", error);
    }
  };
};

export const UpdateEvent = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event,
        },
      });
      toastr.info("Updated", "The EVENT has been Updated");
    } catch (error) {
      toastr.error("Please Try Again Later", error);
    }
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
      dispatch(asyncActionFail());
    }
  };
};
