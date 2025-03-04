import { ISingleRouteData, } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface SingleRouteState {
    Route: ISingleRouteData;
  }
const initialState: SingleRouteState = {
  Route: {
      Result: {
        Route:{
          AddInfo: null,
          AllStops: [],
          ArriveName: "",
          Carrier: 0,
          CarrierName: "",
          City1: "",
          City2: "",
          CountFreePromos: 0,
          DateArrive: "",
          DateDepart: "",
          DepartName: "",
          Hour: "",
          Id: "",
          IsCache: false,
          IsPartnerRoute: false,
          FullBusPlaces:[],
          Minuts: "",
          Price: [],
          RealCarrierName: "",
          Route: "",
          Routes: [],
          TimeArrive: "",
          TimeDepart: ""
        },
        DocumentTypes: [],
        PassengersCitizenship: [],
        PaymentTypes: [],
        PaySystems: [],
        MultiplePassengersBooking: false,
        HasPlacesSelection: false,
        HasPromoPermission: false
      },
      Error: null
  }
 
  
}

export const singleRouteSlice = createSlice({
  name: "singleRoute",
  initialState,
  reducers: {
    setSingleRoute: (state, action: PayloadAction<ISingleRouteData>) => {
      state.Route = action.payload;
    },
  },
});
export const { setSingleRoute } = singleRouteSlice.actions;
export default singleRouteSlice.reducer;