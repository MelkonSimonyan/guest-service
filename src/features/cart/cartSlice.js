import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartProducts: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartProducts = action.payload
    },
    setToCart: (state, action) => {
      const exist = state.cartProducts.find(x => x.id === action.payload.id)
      if (exist) {
        exist.quantity++
      } else {
        state.cartProducts.push({
          ...action.payload,
          quantity: 1
        })
      }
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(x => x.id !== action.payload.id)
    },
    decreaseCart: (state, action) => {
      const exist = state.cartProducts.find(x => x.id === action.payload.id)
      if (exist.quantity > 1) {
        exist.quantity--
      }
    },
    increaseCart: (state, action) => {
      const exist = state.cartProducts.find(x => x.id === action.payload.id)
      exist.quantity++
    },
  }
})

export const {
  setCart,
  setToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
} = cartSlice.actions

export const selectCart = (state) => state.cart

export default cartSlice.reducer