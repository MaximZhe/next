import { createSlice} from "@reduxjs/toolkit";

import { ITariffData } from '../../app/types/types';

interface DataRouteState {
    dataRoutes: ITariffData;
  }

  const initialState: DataRouteState = {
    dataRoutes: {
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


export const dataRoutesSlice = createSlice({
  name: "dataRoutes",
  initialState,
  reducers: {
    setDataRoutes: (state, action) => {
      state.dataRoutes = action.payload;
    },
  },
});
export const { setDataRoutes } = dataRoutesSlice.actions;
export default dataRoutesSlice.reducer;