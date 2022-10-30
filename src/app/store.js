import { configureStore } from '@reduxjs/toolkit';
import initReducer from '../features/init/initSlice';
import pageInfoReducer from '../features/pageInfo/pageInfoSlice';
import visibilityReducer from '../features/visibility/visibilitySlice';

export const store = configureStore({
  reducer: {
    init: initReducer,
    pageInfo: pageInfoReducer,
    visibility: visibilityReducer,
  },
});
