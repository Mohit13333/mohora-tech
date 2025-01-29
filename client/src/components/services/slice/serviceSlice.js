import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  loading: false,
  error: null,
  success: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
  },
});

export const { setServices, setLoading, setError, setSuccess } =
  serviceSlice.actions;

export default serviceSlice.reducer;
