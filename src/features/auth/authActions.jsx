import { LOGIN_USER, LOGOUT_USER } from "./authConstants";
import { closeModel } from "../model/modelActions";
import { toastr } from "react-redux-toastr";
import { SubmissionError } from "redux-form";

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
