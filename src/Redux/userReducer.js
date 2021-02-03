//INITIAL STATE
const initialState = {
  user: "No User",
  isLoggedIn: false,
};

//ACTION CONSTANTS
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "LOGOUT";

//ACTION CREATORS
//all action creators will return !!ONLY!! an object with type and payload properties
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

//REDUCER
//we will NEVER directly invoke the Reducer!
//we invoke our action creators and REDUX does the rest.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload, isLoggedIn: true };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
