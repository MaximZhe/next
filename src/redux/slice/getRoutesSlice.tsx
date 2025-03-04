import { createSlice} from "@reduxjs/toolkit";

import { ITariffData } from '../../app/types/types';

interface DataRouteState {
    dataRoute: ITariffData;
  }

  const initialState: DataRouteState = {
    dataRoute: {
      Result: {
        IsActive: true,
        CarrierRoutes: [],
        Id: '',
        CityDeparture: 0,
        CityArrival: 0,
        DateDeparture: '',
        DateCreate: '',
        IsDynamic: false,
      },
      Error: null,
     
    },
  };


export const datasSlice = createSlice({
  name: "dataRoute",
  initialState,
  reducers: {
    setDataRoute: (state, action) => {
      state.dataRoute = action.payload;
    },
  },
});
export const { setDataRoute } = datasSlice.actions;
export default datasSlice.reducer;