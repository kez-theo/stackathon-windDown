import axios from "axios";

const TOKEN = "token";

//ACTIONS
const GET_ROUTINE = "GET_ROUTINE";
const GET_ACTIVITY = "GET_ACTIVITY";
const CREATE_ACTIVITY = "CREATE_ACTIVITY";
const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
const DELETE_ACTIVITY = "DELETE_ACTIVITY";

//ACTION CREATORS
export const getRoutine = (routine) => ({
  type: GET_ROUTINE,
  routine,
});

export const newRoutine = (activity) => ({
  type: CREATE_ACTIVITY,
  activity,
});

export const editRoutine = (activity) => ({
  type: UPDATE_ACTIVITY,
  activity,
});

export const removeActivity = (activity) => ({
  type: DELETE_ACTIVITY,
  activity,
});

//THUNKS
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

export const createActivity = (activity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: newActivity } = await axios.post("/api/activities", activity, {
        headers: {
          authorization: token,
        },
      });
      dispatch(newRoutine(newActivity));
    }
  }
}

export const updateActivity = (activity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: updatedActivity } = await axios.put(`/api/activities/${activity.id}`, activity, {
        headers: {
          authorization: token,
        },
      });
      dispatch(editRoutine(updatedActivity));
    }
  }
}

export const deleteActivity = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: activity } = await axios.delete(`/api/activities/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(removeActivity(activity));
    }
  }
}

//REDUCER
const initialState = [];

export default function routineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTINE:
      return action.routine;
    case CREATE_ACTIVITY:
      return [...state, action.activity];
    case UPDATE_ACTIVITY:
      return state.map((activity) => {activity.id === action.activity.id ? action.activity : activity});
    case DELETE_ACTIVITY:
      return state.filter((activity) => activity.id !== action.activity.id);
    default:
      return state;
  }
}