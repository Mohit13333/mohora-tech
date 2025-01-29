import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    setfaqs(state, action) {
      state.faqs = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    clearMessage(state) {
      state.error = null;
      state.success = null;
    },
  },
});

export const { setfaqs, setLoading, setError, setSuccess, clearMessage } =
  faqSlice.actions;
export default faqSlice.reducer;
