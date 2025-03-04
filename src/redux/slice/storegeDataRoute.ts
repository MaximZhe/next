import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemRoutes} from '../../app/types/types';

interface DataRouteState {
    Routes: IItemRoutes[];
  }

  const initialState: DataRouteState = {
    Routes:[
        {
            SessionRouteId: null,
            City1: '',
            City2: '',
            DepartName: '',
            ArriveName: '',
            DateDepart1: '',
            DateArrive1: '',
            TimeArrive: '',
            DateArrive: '',
            TimeDepart: '',
            DateDepart: '',
            DepartDateTime: '',
            ArriveDateTime: '',
            Hour: '',
            Minuts: '',
            FreePlace: 0,
            Price:[],
            BaggagePrices: [],
            BaggageDescription: '',
            Path: '',
            Id: '',
            RouteNumber: null,
            Routes:[],
            Carrier: 0,
            CarrierName: '',
            CarrierLogo: null,
            RealCarrierName: '',
            RealCarrierId: 0,
            RealIsPersonalCarrier: false,
            Delete: '',
            CountFreePromos: 0,
            MaxDiscountPercent: null,
            IsSpecialRules: false,
            IsInternationalAbroad: false,
            Platforma: '',
            Link: null,
            AllStops: [],
            IsCache: false,
            FullPrice: null,
            BusId: null,
            BusPlaces: null,
            FreePlaces: null,
            AdditionalPlace: null,
            AddInfo: null,
            BusOptions: [],
            FullBusPlaces: [],
            TicketRules: null,
            UsedByArtmark: null ,
            HasExpressAttr: false,
            IsPartnerRoute: false,
            SortPriority: 0,
            AnnylationRules: '',
            Route: '',
        }
    ]
  };


export const storegeSlice = createSlice({
  name: "storegeRoute",
  initialState,
  reducers: {
    setStoregeRoute: (state, action: PayloadAction<IItemRoutes[]>) => {
      state.Routes = action.payload;
    },
  },
});
export const { setStoregeRoute } = storegeSlice.actions;
export default storegeSlice.reducer;