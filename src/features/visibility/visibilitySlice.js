import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalVisible: false,
  menuVisible: false,
  langVisible: false,
  currencyVisible: false,
}

export const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    modalShow: (state) => {
      state.modalVisible = true
    },
    modalHide: (state) => {
      state.modalVisible = false
    },
    menuShow: (state) => {
      state.menuVisible = true
    },
    menuHide: (state) => {
      state.menuVisible = false
    },
    langShow: (state) => {
      state.langVisible = true
    },
    langHide: (state) => {
      state.langVisible = false
    },
    currencyShow: (state) => {
      state.currencyVisible = true
    },
    currencyHide: (state) => {
      state.currencyVisible = false
    },
  }
})

export const selectVisibility = (state) => state.visibility

export const {
  modalShow,
  modalHide,
  menuShow,
  menuHide,
  langShow,
  langHide,
  currencyShow,
  currencyHide,
} = visibilitySlice.actions

export default visibilitySlice.reducer