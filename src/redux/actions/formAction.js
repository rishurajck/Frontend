import { SET_FORM_VALUES } from "../types/authTypes.js";

export const setFormValues = (values) => {
  return {
    type: SET_FORM_VALUES,
    payload: values,
  };
};
