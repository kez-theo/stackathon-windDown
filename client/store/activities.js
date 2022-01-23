import axios from "axios";

const TOKEN = "token";

//ACTIONS
const GET_ROUTINE = "GET_ROUTINE";

//ACTION CREATORS
export const getRoutine = (routine) => ({
  type: GET_ROUTINE,
  routine,
});

export const fetchRoutine = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: routine } = await axios.get("/api/activities", {
        headers: {
          authorization: token,
        },
      });
      return dispatch(getRoutine(routine));
    }
  };
};

//REDUCER
const initialState = [];

export default function routineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTINE:
      return action.activities;
    default:
      return state;
  }
}