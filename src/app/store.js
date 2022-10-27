import { configureStore } from '@reduxjs/toolkit';
import initReducer from '../features/init/initSlice';
import currentPageReducer from '../features/currentPage/currentPageSlice';
import visibilityReducer from '../features/visibility/visibilitySlice';

export const store = configureStore({
  reducer: {
    init: initReducer,
    currentPage: currentPageReducer,
    visibility: visibilityReducer,
  },
});
