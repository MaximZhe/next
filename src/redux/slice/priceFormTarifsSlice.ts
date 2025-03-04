import { createSlice, PayloadAction }from "@reduxjs/toolkit";


interface IpriceFormTarifs {
    priceFormTarifs: number[]
}
const initialState:IpriceFormTarifs = {
    priceFormTarifs: [],
  };
  
  const priceFormTarifsSlice = createSlice({
    name: 'priceFormTarifs',
    initialState,
    reducers: {
      setPriceFormTarifs: (state, action: PayloadAction<number[]>) => {
        state.priceFormTarifs = action.payload;
      },
    },
  });
  
  export const { setPriceFormTarifs} = priceFormTarifsSlice.actions;
  
  export default priceFormTarifsSlice.reducer;