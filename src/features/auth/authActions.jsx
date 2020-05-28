import { LOGIN_USER, LOGOUT_USER } from "./authConstants";
import { closeModel } from "../model/modelActions";

export const logIn = (credentials) => {
  return (disptach) => {
    disptach({
      type: LOGIN_USER,
      payload: { credentials },
    });

    disptach(closeModel());
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};
