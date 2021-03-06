import { DELETE_EVENT, FETCH_EVENT } from "./eventConstants";
import {
  asyncActionFinish,
  asyncActionStart,
  asyncActionFail,
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import { getFirebase } from "react-redux-firebase";
import firebase from "../../app/Config/firebase";

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
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      // dispatch({
      //   type: UPDATE_EVENT,
      //   payload: {
      //     event,
      //   },
      // });
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

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are You Sure You Want To Cancel It..!"
    : "This Will Reactivate The Event";

  console.log("eventId", cancelled);
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${eventId}`, {
          cancelled: cancelled,
        }),
    });
  } catch (error) {
    toastr.error(error.message);
  }
};

export const addingComments = (eventId, comment, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;

  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.providerData[0].photoURL,
    uid: user.uid,
    textComment: comment.comment,
    date: Date.now(),
  };

  try {
    await firebase.push(`event_chat/${eventId}`, newComment);
    toastr.success("New Comments has been added");
  } catch (error) {
    console.log("Cant add a new comment");
    toastr.error(error.message);
  }
};
