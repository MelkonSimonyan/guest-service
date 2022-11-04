import { configureStore } from '@reduxjs/toolkit'
import initReducer from '../features/init/initSlice'
import pageInfoReducer from '../features/pageInfo/pageInfoSlice'
import visibilityReducer from '../features/visibility/visibilitySlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    init: initReducer,
    pageInfo: pageInfoReducer,
    visibility: visibilityReducer,
    cart: cartReducer,
  }
})
