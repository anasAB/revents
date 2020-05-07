import { CREAT_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./eventConstants";

//! Action Creator
export const creatEvent = (event) => {
  return {
    type: CREAT_EVENT,
    Payload: { event },
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: { eventId },
  };
};

export const UpdateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: { event },
  };
};
