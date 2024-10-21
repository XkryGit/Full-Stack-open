import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filter from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: filter,
  },
});

export default store;
