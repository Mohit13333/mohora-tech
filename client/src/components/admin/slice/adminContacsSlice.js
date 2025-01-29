import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminContacts: [],
};

const adminContactsSlice = createSlice({
  name: "adminContacts",
  initialState,
  reducers: {
    setAdminContacts(state, action) {
      state.adminContacts = action.payload;
    },
  },
});

export const { setAdminContacts } = adminContactsSlice.actions;

export default adminContactsSlice.reducer;
