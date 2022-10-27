import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalVisible: false,
  menuVisible: false,
  langVisible: false,
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
} = visibilitySlice.actions

export default visibilitySlice.reducer