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
import { getFirebase } from "react-redux-firebase";

const createNewEvent = (user, photoURL, event) => {
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/assets/user.png",
    created: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName,
        host: true,
      },
    },
  };
};

//! Action Creator
export const creatEvent = (event) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newEvent = createNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add("events", newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
      });
      toastr.success("Succcess!", "Event Has Been Created Successfully.. ");
      return createdEvent;
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
