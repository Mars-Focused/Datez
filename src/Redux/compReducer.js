//INITIAL STATE
const initialState = {
  compName: "Mario",
};

//ACTION CONSTANTS
const SELECT_COMPANION = "SELECT_COMPANION";

//ACTION CREATORS
export function selectComp(compName) {
  console.log(`compName: ${compName}`);
  return {
    type: SELECT_COMPANION,
    payload: compName,
  };
}

//REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_COMPANION:
      return { ...state, compName: action.payload };

    default:
      return state;
  }
}
