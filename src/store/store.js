// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Tích hợp API slice vào store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // Thêm middleware cho RTK Query
});

export default store;
