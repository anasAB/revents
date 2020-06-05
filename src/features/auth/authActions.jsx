import { LOGIN_USER, LOGOUT_USER } from "./authConstants";
import { closeModel } from "../model/modelActions";
import { toastr } from "react-redux-toastr";
import { SubmissionError } from "redux-form";
import { getFirestore } from "redux-firestore";
import { firestore } from "firebase";

export const logIn = (credentials) => {
  return async (disptach, getState, { getFirebase }) => {
    const firbase = getFirebase();

    try {
      await firbase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      disptach(closeModel());
      toastr.success("Success!", "Welcome to our Events.. ");
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const registration = (user) => async (
  disptach,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firstore = getFirestore();
  try {
    let creatUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log("#creatUser", creatUser);
    await creatUser.user.updateProfile({ displayName: user.displayName });

    let newUser = {
      displayName: user.displayName,
      createdAt: firstore.FieldValue.serverTimestamp(),
    };
    console.log("#newUser", newUser);

    await firstore.set(`users/${creatUser.user.uid}`, { ...newUser });
    disptach(closeModel());
  } catch (error) {
    // toastr.error(error.message);
    throw new SubmissionError({ _error: error.message });
  }
};

//!SocialLogIn
export const socialLogInMethod = (selectedProvider) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup",
    });

    console.log("#user", user);
    //!Check if this user already exists
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      toastr.success("Success!", "Welcome to our Events.. ");
    } else {
      toastr.success("Success!", `Welcome Back ${user.profile.displayName}`);
    }
    dispatch(closeModel());
  } catch (error) {
    console.log(error);
  }
};
