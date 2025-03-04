import { getServerSideProps } from '@/app/api/actionCity';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchInitialData = createAsyncThunk(
  'data/fetchInitialData',
  async () => {
    const response = await getServerSideProps();
    return response;
  }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: null as string | null,
      },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchInitialData.fulfilled, (state, action) => {
         state.data = action.payload;
        })
    }
  });

export default dataSlice.reducer;