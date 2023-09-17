import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IAppState = {
	isUserRefetching: boolean;
};
const initialState: IAppState = {
	isUserRefetching: false
};

const appSlice = createSlice({
	name: 'breadcumbSlice',
	initialState,
	reducers: {
		setUserIsFetching: (state, action: PayloadAction<boolean>) => {
			state.isUserRefetching = action.payload;
			return state;
		}
	}
});
export const { setUserIsFetching } = appSlice.actions;
export default appSlice.reducer;
