
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    dataItem: {},
}

export const singleItemSales = createSlice({
    name: 'singleItemSale',
    initialState,
    reducers: {
        setDataItem:(state, action: PayloadAction<[]>) => {
            state.dataItem = action.payload
        }
    }
})

export const {setDataItem} = singleItemSales.actions;
export default singleItemSales.reducer