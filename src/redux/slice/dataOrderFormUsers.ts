import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IUser {
    citizenship: string,
  ageTariff: string,
  gender: string,
  lastName: string,
  firstName: string,
  middleName: string,
  birthdate: any,
  documentType: string,
  documentNumber: string
}
// const user: IUser = {
//     citizenship: '',
//   ageTariff: '',
//   gender: '',
//   lastName: '',
//   firstName: '',
//   middleName: '',
//   birthdate: null,
//   documentType: '',
//   documentNumber: ''
// }
interface IDataUsers {
    data: IUser[]
}
const initialState:IDataUsers = {
    data:[] 
}

export const dataOrderForm = createSlice({
    name: ' dataOrderForm',
    initialState,
    reducers: {
        setDataOrderForm:(state, action: PayloadAction<IDataUsers>) => {
            state.data = action.payload.data
        }
    }
})

export const {setDataOrderForm} = dataOrderForm.actions;
export default dataOrderForm.reducer