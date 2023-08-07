import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadPlaces, setLoadingStatus, requireAuthorization, loadCurrentOffer } from './action';
import { Place } from '../types/place';
import { AuthData } from '../types/auth-data';
import { saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';

export const fetchOffers = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchOffers',
	async(_arg, {dispatch, extra: api}) => {
		dispatch(setLoadingStatus(true));
		const {data} = await api.get<Place[]>(APIRoute.Offers);
		dispatch(setLoadingStatus(false));
		dispatch(loadPlaces(data));
	}
);

export const checkAuthStatus = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'checkAuth',
	async(_arg, {dispatch, extra: api}) => {
		try {
			await api.get(APIRoute.Login);
			dispatch(requireAuthorization(AuthorizationStatus.Auth));
		} catch {
			dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		}
	}
);

export const logIn = createAsyncThunk<void, AuthData, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'login',
	async({login: email, password}, {dispatch, extra: api}) => {
		const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
		saveToken(token);
		dispatch(requireAuthorization(AuthorizationStatus.Auth));
	}
);

export const fetchCurrentOffer = createAsyncThunk<void, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchCurrentOffer',
	async(id, {dispatch, extra: api}) => {
		dispatch(setLoadingStatus(true));
		const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
		dispatch(setLoadingStatus(false));
		dispatch(loadCurrentOffer(data));
	}
);
