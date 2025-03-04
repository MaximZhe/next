import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    lengthListItems: 0,
}

export const sliderItems = createSlice({
    name: ' sliderItems',
    initialState,
    reducers: {
        setLengthListItems:(state, action: PayloadAction<number>) => {
            state.lengthListItems = action.payload
        }
    }
})

export const {setLengthListItems} = sliderItems.actions;
export default sliderItems.reducer