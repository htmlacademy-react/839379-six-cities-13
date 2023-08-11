import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { loadPlaces, requireAuthorization, loadCurrentOffer, loadComments, loadNearPlaces, addComment, setError } from './action';
import { Place } from '../types/place';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import {Comment, Comments, NewComment} from '../types/comments';

export const fetchOffer = createAsyncThunk<void, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchOffer',
	async (id, {dispatch, extra: api}) => {
		const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
		dispatch(loadCurrentOffer(offer));
	}
);

export const fetchComments = createAsyncThunk<void, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchComments',
	async (id, {dispatch, extra: api}) => {
		const {data: comments} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
		dispatch(loadComments(comments));
	}
);

export const fetchNearPlaces = createAsyncThunk<void, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchNearPlaces',
	async (id, {dispatch, extra: api}) => {
		const {data: nearPlaces} = await api.get<Place[]>(`${APIRoute.Offers}/${id}/nearby`);
		dispatch(loadNearPlaces(nearPlaces));
	}
);

export const clearError = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'clearError',
	(_arg, {dispatch}) => {
		setTimeout(
			() => dispatch(setError(null)),
			TIMEOUT_SHOW_ERROR
		);
	}
);

export const fetchOffers = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'fetchOffers',
	async(_arg, {dispatch, extra: api}) => {
		const {data} = await api.get<Place[]>(APIRoute.Offers);
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

export const logOut = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'logout',
	async(_arg, {dispatch, extra: api}) => {
		await api.delete(APIRoute.Logout);
		dropToken();
		dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
	}
);

export const sendComment = createAsyncThunk<void, NewComment, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}
>(
	'sendComment',
	async ({id, comment, rating},{dispatch, extra: api}) => {
		const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
		dispatch(addComment(data));
	}
);

