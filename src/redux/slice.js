import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operation";

const tasksInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState: tasksInitialState,
  extraReducers: {
    [fetchUser.pending](state) {
      state.isLoading = true;
    },

    [fetchUser.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchUser.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
