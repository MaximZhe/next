import {combineReducers, configureStore } from "@reduxjs/toolkit";
import widthWindowReduser from "../slice/widthWindowSlice";
import languageReduser from "../slice/languageSlice";
import stateMobileMenuReduser from "../slice/menuMobileStateSlice";
import sliderItemsReduser from "../slice/sliderItemsSlice";
import singleItemSalesReduser from "../slice/singleItemSalesSlice";
import dataRouteReduser from "../slice/getRoutesSlice";
import dataOrderFormReduser from '../slice/dataOrderFormUsers';
import storegeRouteReduser from '../slice/storegeDataRoute';
import cityDepartureReduser from '../slice/cityDepartureSlice';
import cityArrivalReduser from '../slice/cityArrivalSlice';
import dataRoutesReduser from '../slice/getRoutesSearchSlice';
import singleRouteReduser from '../slice/singleRouteDataSlice';
import dateSearchRouteReduser from '../slice/dateSearchRouteSlice';
import priceFormTarifsReduser from '../slice/priceFormTarifsSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { setupListeners } from "@reduxjs/toolkit/dist/query/react";



const persistConfig = {
  key: "root",
  storage,
};
const rootReduсer = combineReducers({
  widthWindowReduser,
  languageReduser,
  stateMobileMenuReduser,
  sliderItemsReduser,
  singleItemSalesReduser,
  dataRouteReduser,
  storegeRouteReduser,
  cityDepartureReduser,
  dataOrderFormReduser,
  singleRouteReduser,
  dateSearchRouteReduser,
  priceFormTarifsReduser,
  cityArrivalReduser,
  dataRoutesReduser,
});
const persistedReducer = persistReducer(persistConfig, rootReduсer);

export const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
  });

  setupListeners(store.dispatch);

  return store;
 
   
};
const store = setupStore();
export const persistor = persistStore(store);
export type RootSate = ReturnType<typeof persistedReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];