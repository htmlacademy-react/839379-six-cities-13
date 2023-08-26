import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, RequestStatus } from '../../const';
import { checkAuthStatus, logIn, logOut } from '../api-actions';
import { UserData } from '../../types/state';
import { UserInfo } from '../../types/user-data';

const initialState: UserData = {
	authorizationStatus: AuthorizationStatus.Unknown,
	checkAuthStatus: RequestStatus.Idle,
	user: {} as UserInfo,
};

export const userData = createSlice({
	name: NameSpace.User,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(checkAuthStatus.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.Auth;
				state.checkAuthStatus = RequestStatus.Success;
				state.user = action.payload;
			})
			.addCase(checkAuthStatus.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
				state.checkAuthStatus = RequestStatus.Error;
			})
			.addCase(logIn.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.Auth;
				state.user = action.payload;
			})
			.addCase(logIn.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			})
			.addCase(logOut.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			});
	}
});
