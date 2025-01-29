import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const globalSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetUI: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const { setLoading, setError, setSuccess, resetUI } = globalSlice.actions;

export default globalSlice.reducer;
