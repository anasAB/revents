import { toastr } from "react-redux-toastr";
import { SubmissionError } from "redux-form";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionFail,
} from "../async/asyncActions";
import cuid from "cuid";
import firebase from "../../app/Config/firebase";
import { FETCH_EVENT } from "../event/eventConstants";

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updateUser } = user;
  try {
    await firebase.updateProfile(updateUser);
    toastr.success("Profile has been Updated ");
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  //!path where we want to img to be stored
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName,
  };
  //! now Adding the Functionality

  try {
    dispatch(asyncActionStart());
    //? upload the file to firebase
    let uploadedFile = await firebase.uploadFile(path, file, null, options);

    //? get URl of the img in the fireStorage
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

    //? get userDoc
    let userDoc = await firestore.get(`users/${user.uid}`);

    //? check if user has photo, if not update profile
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL,
      });
      //? update the auth section in the firebase
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }

    //? add the img to fireStore
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }],
      },
      {
        //? What we will add in our subcollections
        name: fileName,
        url: downloadURL,
      }
    );

    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionFail());
    throw new SubmissionError({ _error: error.message });
  }
};

export const goingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/assets/user.png",
    displayName: profile.displayName,
    host: false,
  };

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee,
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false,
    });
    toastr.success("Success", "You have signed up to the event");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem signing up to the event");
  }
};

export const cancelGoingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success(
      "Success",
      "You have been removed your self from this event"
    );
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem With Canceling the Event Attending");
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date();
  let eventsRef = firestore.collection("event_attendee");
  let query;
  switch (activeTab) {
    case 1: // past events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: // future events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3: // hosted events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc");
      break;
    default:
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
      break;
  }
  try {
    let querySnap = await query.get();
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = await firestore
        .collection("events")
        .doc(querySnap.docs[i].data().eventId)
        .get();
      events.push({ ...evt.data(), id: evt.id });
    }
    dispatch({ type: FETCH_EVENT, payload: { events } });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
  }
};
