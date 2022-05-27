import axios from "axios";

const TOKEN = "token";

const initialState = []

//ACTIONS
const GET_ROUTINE = "GET_ROUTINE";
const CREATE_ROUTINE = "CREATE_ROUTINE";
const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
const UPDATE_DURATION = "UPDATE_DURATION";

//ACTION CREATORS
export const getRoutine = (routine) => ({
  type: GET_ROUTINE,
  routine,
});

export const setRoutine = (activities) => ({
  type: CREATE_ROUTINE,
  activities,
});

export const editActivity = (activity) => ({
  type: UPDATE_ACTIVITY,
  activity
});

export const editDuration = (activity) => ({
  type: UPDATE_DURATION,
  activity
});

//THUNKS
export const fetchRoutine = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: routine } = await axios.get("/api/routine", {
        headers: {
          authorization: token,
        },
      });
      return dispatch(getRoutine(routine));
    }
  };
};

export const createRoutine = (activities) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: routineActivities } = await axios.post("/api/routine", activities, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setRoutine(routineActivities));
    }
  }
}

export const updateActivity = (activity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: updatedActivity } = await axios.put(`/api/routine/${activity.activityId}`, activity, {
        headers: {
          authorization: token,
        },
      });
      dispatch(editActivity(updatedActivity));
    }
  }
}

export const updateDuration = (activity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: updatedActivity } = await axios.put(`/api/routine/${activity.activityId}/duration`, activity, {
        headers: {
          authorization: token,
        },
      });
      dispatch(editDuration(updatedActivity));
    }
  }
}

//REDUCER

export default function routineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTINE:
      return action.routine;
    case CREATE_ROUTINE:
      return [...action.activities];
    case UPDATE_ACTIVITY:
      return state.map((activity) => {
        return (
          activity.activityId === action.activity.activityId ? action.activity : activity
        )});
    case UPDATE_DURATION:
      return state.map((activity) => {
        return (
          activity.activityId === action.activity.activityId ? action.activity : activity
        )});
    default:
      return state;
  }
}