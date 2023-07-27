import { createSlice } from "@reduxjs/toolkit";

export const grocerySlice = createSlice({
  name: "groceries",
  initialState: {
    entries: [],
    update: false,
    synced: true,
  },
  reducers: {
    getList: (state, action) => {
      state.entries = action.payload;
      console.log(state.entries);
    },
    refresh: (state) => {
      state.update = !state.update;
      console.log(state.update);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getList, refresh } = grocerySlice.actions;

export default grocerySlice.reducer;
