
import { configureStore } from '@reduxjs/toolkit';
import hackathonsReducer from './hackathons-slice';

export const store = configureStore({
  reducer: {
    hackathons: hackathonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
