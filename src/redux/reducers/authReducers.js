// import {
//   SET_USER,
//   LOGOUT_USER,
//   SET_ADMIN_TOKEN,
//   SET_TOKEN,
// } from "../types/authTypes.js";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("userData")) || null,
//   token: localStorage.getItem("token") || null,
//   adminToken: localStorage.getItem("adminToken") || null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case LOGOUT_USER:
//       return {
//         ...state,
//         user: null,
//       };
//     case SET_ADMIN_TOKEN:
//       return {
//         ...state,
//         adminToken: action.payload,
//       };
//     case SET_TOKEN:
//       return {
//         ...state,
//         token: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default authReducer;

// // to get user info in any component just import useSelector from react-redux
// // and make a const and store it as useSelector((state)=> state.auth.user);
import {
  SET_USER,
  LOGOUT_USER,
  SET_TOKEN,
  SET_ADMIN_USER, // <-- make sure this is imported
} from "../types/authTypes.js";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  token: localStorage.getItem("token") || null,

  adminUser: null, // <-- add this
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        adminToken: null,
        adminUser: null,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ADMIN_USER:
      return {
        ...state,
        adminUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
