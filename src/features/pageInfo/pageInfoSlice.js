import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageTitle: '',
  parentLink: ''
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    setPageInfo: (state, action) => {
      state.pageTitle = action.payload.pageTitle
      state.parentLink = action.payload.parentLink
    },
  }
});

export const { setPageInfo } = pageInfoSlice.actions;

export const selectPageInfo = (state) => state.pageInfo;

export default pageInfoSlice.reducer;