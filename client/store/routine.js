import axios from "axios";

const TOKEN = "token";

const initialState = {
    activities: [] 
} 

//ACTIONS
const GET_ROUTINE = "GET_ROUTINE";
const ADD_ACTIVITY = "ADD_ACTIVITY";
const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
const REMOVE_ACTIVITY = "DELETE_ACTIVITY";

//ACTION CREATORS
export const getRoutine = (routine) => ({
  type: GET_ROUTINE,
  routine,
});

export const _addActivity = (activity) => ({
  type: ADD_ACTIVITY,
  activity,
});

export const editActivity = (activity) => ({
  type: UPDATE_ACTIVITY,
  id: activity.id,
});

export const _removeActivity = (activity) => ({
  type: REMOVE_ACTIVITY,
  activity,
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

export const addActivity = (activity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: newActivity } = await axios.post("/api/routine", activity, {
        headers: {
          authorization: token,
        },
      });
      console.log(activity)
      dispatch(_addActivity(newActivity));
    }
  }
}

export const updateActivity = (activity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: updatedActivity } = await axios.put(`/api/routine/${activity.id}`, activity, {
        headers: {
          authorization: token,
        },
      });
      dispatch(editActivity(updatedActivity));
    }
  }
}

export const removeActivity = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: activity } = await axios.delete(`/api/activities/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_removeActivity(activity));
    }
  }
}

//REDUCER

export default function routineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTINE:
      return action.routine;
    case ADD_ACTIVITY:
      console.log(action.activity)
      return {...state,
        activities: [...state.activities, action.activity]
      };
    case UPDATE_ACTIVITY:
      return state.map((activity) => {activity.id === action.activity.id ? action.activity : activity});
    case REMOVE_ACTIVITY:
      return state.filter((activity) => activity.id !== action.activity.id);
    default:
      return state;
  }
}