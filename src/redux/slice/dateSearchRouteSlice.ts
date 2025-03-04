import { createSlice, PayloadAction }from "@reduxjs/toolkit";

const initialState = {
    dateSearchRoute: "",
  };
  
  const dateSearchRouteSlice = createSlice({
    name: 'dateSearchRoute',
    initialState,
    reducers: {
      setDateSearchRoute: (state, action: PayloadAction<string>) => {
        state.dateSearchRoute = action.payload;
      },
    },
  });
  
  export const { setDateSearchRoute} = dateSearchRouteSlice.actions;
  
  export default dateSearchRouteSlice.reducer;