import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadPlaces, setLoadingStatus, requireAuthorization, loadCurrentOffer, loadComments, loadNearPlaces } from './action';
import { Place } from '../types/place';
import { AuthData } from '../types/auth-data';
import { saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import { Comments } from '../types/comments';

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

export const fetchOfferInfo = createAsyncThunk<void, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchOfferInfo',
	async (id, {dispatch, extra: api}) => {
		dispatch(setLoadingStatus(true));
		const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
		dispatch(loadCurrentOffer(offer));
		const {data: comments} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
		dispatch(loadComments(comments));
		const {data: nearPlaces} = await api.get<Place[]>(`${APIRoute.Offers}/${id}/nearby`);
		dispatch(setLoadingStatus(false));
		dispatch(loadNearPlaces(nearPlaces));
	}
);


