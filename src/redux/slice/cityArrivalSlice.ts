import { createSlice } from "@reduxjs/toolkit";

const initialState= {
      Name: "",
};

const cityArrivalSlice = createSlice({
  name: "cityArrival",
  initialState,
  reducers: {
    setCityArrivalName: (state, action) => {
      state.Name = action.payload;
    },

  },
});

export const { setCityArrivalName } =
  cityArrivalSlice.actions;

export default cityArrivalSlice.reducer;
