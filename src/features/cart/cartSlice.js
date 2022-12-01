import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  carts: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload
    },
    clearCart: (state, action) => {
      const store = state.carts.find(x => x.storeId == action.payload.storeId)
      store.products = []
    },
    setToCart: (state, action) => {
      const store = state.carts.find(x => x.storeId == action.payload.storeId)
      const exist = store.products.find(x => x.id == action.payload.id)

      if (exist) {
        exist.quantity++
      } else {
        store.products.push({
          id: action.payload.id,
          storeId: action.payload.storeId,
          quantity: 1
        })
      }
    },
    removeFromCart: (state, action) => {
      const store = state.carts.find(x => x.storeId == action.payload.storeId)
      store.products = store.products.filter(x => x.id !== action.payload.id)
    },
    decreaseCart: (state, action) => {
      const store = state.carts.find(x => x.storeId == action.payload.storeId)
      const exist = store.products.find(x => x.id === action.payload.id)
      if (exist.quantity > 1) {
        exist.quantity--
      }
    },
    increaseCart: (state, action) => {
      const store = state.carts.find(x => x.storeId == action.payload.storeId)
      const exist = store.products.find(x => x.id === action.payload.id)
      exist.quantity++
    },
  }
})

export const {
  setCart,
  clearCart,
  setToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
} = cartSlice.actions

export const selectCart = (state) => state.cart

export default cartSlice.reducer