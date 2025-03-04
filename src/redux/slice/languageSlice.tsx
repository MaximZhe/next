import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    language: 'RUS', 
    isOpen: false
}

export const languageValueSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguageValue:(state, action: PayloadAction<string>) => {
            state.language = action.payload
        },
        setIsToggleMenu: ( state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        }
    }
}) 

export const {setLanguageValue,setIsToggleMenu} = languageValueSlice.actions;
export default languageValueSlice.reducer