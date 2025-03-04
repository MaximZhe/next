import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isShow: false,
}

export const isStateMenuMobail = createSlice ({
    name: 'stateMobileMenu',
    initialState,
    reducers: {
        setIsStateMenuMobail:(state, action:PayloadAction<boolean>) => {
            state.isShow = action.payload
        }
    }
})

export const { setIsStateMenuMobail } = isStateMenuMobail.actions;
export default isStateMenuMobail.reducer