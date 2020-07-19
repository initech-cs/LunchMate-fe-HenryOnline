import { createStore } from "redux";
import getData from "../ultils/getData";

const initialState = {
  user: {},
  token: "",
  isAuthenticated: false,
};

function reducer(state = initialState, action) {
  if (action.type === "LOGIN") {
    state = action.payload;
    state.isAuthenticated = true;
  }
  return state;
}

const store = createStore(reducer);

export default store;
