import { SET_USER, LOGOUT_USER } from "../types/authTypes.js";

export const setUser = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
  return {
    type: SET_USER,
    payload: userData,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userData");

  return {
    type: LOGOUT_USER,
  };
};
