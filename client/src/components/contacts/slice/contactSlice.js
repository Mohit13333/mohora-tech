import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
  },
});

export const { setContacts } = contactSlice.actions;

export default contactSlice.reducer;
