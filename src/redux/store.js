import { createStore } from "redux";

const initialState = {
  token: "",
};

function reducer(state = initialState, action) {
  if (action.type === "LOGIN") {
    state.token = action.payload;
  }
  if (action.type === "LOGOUT") {
    state.token = action.payload;
  }
  if (action.type === "UPDATE") {
    state.token = action.payload;
  }
  console.log(state);
  return state;
}

const store = createStore(reducer);

export default store;
