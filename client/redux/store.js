import { configureStore } from "@reduxjs/toolkit";
import groceryReducer from "./slice";

export default configureStore({
  reducer: {
    groceryList: groceryReducer,
  },
});
