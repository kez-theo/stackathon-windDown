import axios from "axios";

const TOKEN = "token";

//ACTIONS
const GET_ACTIVITIES = "GET_ACTIVITIES";

//ACTION CREATORS
export const getActivities = (activities) => ({
  type: GET_ACTIVITIES,
  activities,
});

//THUNKS
export const fetchActivities = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: activities } = await axios.get("/api/activities", {
        headers: {
          authorization: token,
        },
      });
      return dispatch(getActivities(activities));
    }
  };
};

// export const createActivity = (activity) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem(TOKEN);
//     if (token) {
//       const { data: newActivity } = await axios.post("/api/activities", activity, {
//         headers: {
//           authorization: token,
//         },
//       });
//       dispatch(newRoutine(newActivity));
//     }
//   }
// }

// export const updateActivity = (activity) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem(TOKEN);
//     if (token) {
//       const { data: updatedActivity } = await axios.put(`/api/activities/${activity.id}`, activity, {
//         headers: {
//           authorization: token,
//         },
//       });
//       dispatch(editRoutine(updatedActivity));
//     }
//   }
// }

// export const deleteActivity = (id) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem(TOKEN);
//     if (token) {
//       const { data: activity } = await axios.delete(`/api/activities/${id}`, {
//         headers: {
//           authorization: token,
//         },
//       });
//       dispatch(removeActivity(activity));
//     }
//   }
// }

//REDUCER
const initialState = [];

export default function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;
    // case CREATE_ACTIVITY:
    //   return [...state, action.activity];
    // case UPDATE_ACTIVITY:
    //   return state.map((activity) => {activity.id === action.activity.id ? action.activity : activity});
    // case DELETE_ACTIVITY:
    //   return state.filter((activity) => activity.id !== action.activity.id);
    default:
      return state;
  }
}