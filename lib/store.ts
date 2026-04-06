import { configureStore } from '@reduxjs/toolkit';
import { tariffsApi } from './api/tariffsApi';

export const store = configureStore({
  reducer: {
    [tariffsApi.reducerPath]: tariffsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tariffsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
