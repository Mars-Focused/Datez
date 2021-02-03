//INITIAL STATE
const initialState = {
  matchId: 0,
  arrOfDates: [],
};

//ACTION CONSTANTS
const UPDATE_MATCH_ID = "UPDATE_MATCH_ID";
const UPDATE_STORED_DATEZ_ARR = "UPDATE_STORED_DATEZ_ARR";

//ACTION CREATORS
//all action creators will return !!ONLY!! an object with type and payload properties
export function updateMatchId(matchId) {
  return {
    type: UPDATE_MATCH_ID,
    payload: matchId,
  };
}

export function updateStoredDatezArr(arrOfDates) {
  return {
    type: UPDATE_MATCH_ID,
    payload: arrOfDates,
  };
}

//REDUCER
//we will NEVER directly invoke the Reducer!
//we invoke our action creators and REDUX does the rest.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MATCH_ID:
      return { ...state, matchId: action.payload };

    case UPDATE_STORED_DATEZ_ARR:
      return { ...state, arrOfDates: action.payload };

    default:
      return state;
  }
}
