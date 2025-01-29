import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: !!localStorage.getItem("accessToken"),
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.loggedInUser = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
