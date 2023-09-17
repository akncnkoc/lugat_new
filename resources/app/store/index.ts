import { configureStore } from '@reduxjs/toolkit';
import appSlice from '@/store/slices/appSlice';
import userSlice from '@/store/slices/userSlice';

export const store = configureStore({
	reducer: {
		userSlice,
		appSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch: storeDispatch } = store;
export default store;
