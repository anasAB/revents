import moment from "moment";
import { toastr } from "react-redux-toastr";
import { SubmissionError, reset } from "redux-form";

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
