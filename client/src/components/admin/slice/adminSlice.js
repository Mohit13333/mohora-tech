import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminUsers: [],
};

const adminSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    setAdminUsers(state, action) {
      state.adminUsers = action.payload;
    },
  },
});

export const { setAdminUsers} =
  adminSlice.actions;

export default adminSlice.reducer;
