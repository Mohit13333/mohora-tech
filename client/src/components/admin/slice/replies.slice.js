import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  replies: [],
};

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    setReplies(state, action) {
      state.replies = action.payload;
    },
  },
});

export const { setReplies } = replySlice.actions;

export default replySlice.reducer;
