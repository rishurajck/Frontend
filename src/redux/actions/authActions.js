import {
  SET_USER,
  LOGOUT_USER,
  SET_ADMIN_TOKEN,
  SET_ADMIN_USER,
} from "../types/authTypes.js";

export const setUser = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
  return {
    type: SET_USER,
    payload: userData,
  };
};

export const setAdminUser = (adminUserData) => ({
  type: SET_ADMIN_USER,
  payload: adminUserData,
});

export const logoutUser = () => {
  localStorage.removeItem("userData");

  return {
    type: LOGOUT_USER,
  };
};
