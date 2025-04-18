import { SET_FORM_VALUES } from "../types/authTypes.js";

const initialState = {
  values: {},
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_VALUES:
      return {
        ...state,
        values: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;

// to get user info in any component just import useSelector from react-redux
// and make a const and store it as useSelector((state)=> state.auth.user);
