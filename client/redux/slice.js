import { createSlice } from "@reduxjs/toolkit";

export const grocerySlice = createSlice({
  name: "groceries",
  initialState: {
    entries: [],
    recall: [],
    update: false,
    selected: {},
    isDelete: "",
    synced: true,
  },
  reducers: {
    getList: (state, action) => {
      state.entries = action.payload;
      console.log(state.entries);
    },
    refresh: (state) => {
      state.update = !state.update;
      state.selected = {};
      state.isDelete = "";
      console.log("selected", state.selected);
      console.log("update", state.update);
    },
    selector: (state, action) => {
      state.selected = action.payload;
    },
    deleteAni: (state, action) => {
      state.isDelete = action.payload;
      console.log("isDelete", state.isDelete);
    },
    getRecall: (state, action) => {
      state.recall = action.payload;
      console.log(state.recall);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getList, refresh, selector, deleteAni, getRecall } =
  grocerySlice.actions;

export default grocerySlice.reducer;
