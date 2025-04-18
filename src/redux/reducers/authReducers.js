import { SET_USER, LOGOUT_USER } from "../types/authTypes.js";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;

// to get user info in any component just import useSelector from react-redux
// and make a const and store it as useSelector((state)=> state.auth.user);
