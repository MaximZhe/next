import {createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState= {
    widthWindow: 0,
}
export const widthWindowSlice = createSlice( {
 name: 'widthWindow',
 initialState,
 reducers: {
    setWidthWindow:(state, action: PayloadAction<number>) => {
        state.widthWindow = action.payload;
    }
 }
})


export const {setWidthWindow} = widthWindowSlice.actions
export default widthWindowSlice.reducer