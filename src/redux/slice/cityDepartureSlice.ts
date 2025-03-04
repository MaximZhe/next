
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  NameDeparture: "",
};

const cityDepartureSlice = createSlice({
  name: 'cityDeparture',
  initialState,
  reducers: {
    setCityDepartureName: (state, action) => {
      state.NameDeparture = action.payload;
    },
  },
});

export const { setCityDepartureName} = cityDepartureSlice.actions;

export default cityDepartureSlice.reducer;
