import { LOGIN_USER, LOGOUT_USER } from "./authConstants";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
  authenticated: false,
  currentUser: null,
};

const logIn = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.credentials.email,
  };
};

const logOut = () => {
  return {
    authenticated: false,
    currentUser: null,
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: logIn,
  [LOGOUT_USER]: logOut,
});
