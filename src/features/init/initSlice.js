import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API, { apiRoot, headers } from '../../API/API'

const initialState = {
  initData: null,
  initStatus: 'loading',
}

export const getInitData = createAsyncThunk('init/getData', async () => {
  const response = await axios.get(apiRoot + 'init', { headers })

  /* if (localStorage.getItem('currency') && localStorage.getItem('currency') !== response.data.currency) {
    localStorage.setItem('currency', response.data.currency)
  }

  if (localStorage.getItem('lang') && localStorage.getItem('lang') !== response.data.lang) {
    localStorage.setItem('lang', response.data.lang)
  } */

  return response.data
})

export const initSlice = createSlice({
  name: 'init',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getInitData.pending, (state) => {
        state.initStatus = 'loading'
      })
      .addCase(getInitData.fulfilled, (state, action) => {
        state.initStatus = 'idle'
        state.initData = action.payload
      })
  },
})

export const selectInit = (state) => state.init

export default initSlice.reducer
