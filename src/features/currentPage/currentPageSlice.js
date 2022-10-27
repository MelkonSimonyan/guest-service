import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPageData: {}
}

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPageData = action.payload;
    },
  }
});

export const { setCurrentPage } = currentPageSlice.actions;

export const selectCurrentPage = (state) => state.currentPage;

export default currentPageSlice.reducer;