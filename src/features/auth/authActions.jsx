import { LOGIN_USER, LOGOUT_USER } from "./authConstants";

export const logIn = (credentials) => {
  return {
    type: LOGIN_USER,
    payload: { credentials },
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};
