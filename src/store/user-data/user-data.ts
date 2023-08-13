import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuthStatus, logIn, logOut } from '../api-actions';
import { UserData } from '../../types/state';

const initialState: UserData = {
	authorizationStatus: AuthorizationStatus.Unknown,
	error: null
};

export const userData = createSlice({
	name: NameSpace.User,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(checkAuthStatus.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.Auth;
			})
			.addCase(checkAuthStatus.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			})
			.addCase(logIn.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.Auth;
			})
			.addCase(logIn.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			})
			.addCase(logOut.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			});
	}
});
