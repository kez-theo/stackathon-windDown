import axios from "axios";

const TOKEN = "token";

//ACTIONS
const SET_USERS = "SET_USERS";
const SET_SINGLE_USER = "SET_SINGLE_USER";

//ACTION CREATORS
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

export const setSingleUser = (user) => ({
  type: SET_SINGLE_USER,
  user,
});

//THUNKS

//Fetch Many Users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: users } = await axios.get("/api/users", {
          headers: {
            authorization: token,
          },
        });
        console.log("Thunk Working!")
        dispatch(setUsers(users));
      }
    } catch (err) {
      console.log(">>>>>>THUNK NOT WORKING!")
    }
  };
};

//Fetch One User
export const fetchSingleUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.get(`/api/users/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        console.log("Thunk Working!")
        dispatch(setUsers(user));
      }
    } catch (err) {
      console.log(">>>>>>THUNK NOT WORKING!")
    }
  };
};

//REDUCER
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case SET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
