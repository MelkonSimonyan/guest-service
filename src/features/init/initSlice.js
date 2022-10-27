import axios from 'axios'
import { apiRoot, headers } from '../../API/config'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  initData: null,
  initStatus: 'loading',
}

export const getInitData = createAsyncThunk('init/getData', async () => {
  const response = await axios.get(apiRoot + 'init', { headers })
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
