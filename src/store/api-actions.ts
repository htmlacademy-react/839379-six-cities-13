import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Place } from '../types/place';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { UserInfo } from '../types/user-data';
import { Offer } from '../types/offer';
import {Comment, Comments, NewComment} from '../types/comments';
import { ErrorMessage } from '../types/error';


export const fetchOffer = createAsyncThunk<Offer | ErrorMessage, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'offer/fetchOffer',
	async (id, {extra: api}) => {
		const {data} = await api.get<Offer | ErrorMessage>(`${APIRoute.Offers}/${id}`);

		return data;
	}
);

export const fetchComments = createAsyncThunk<Comments, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'comments/fetchComments',
	async (id, {extra: api}) => {
		const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);

		return data;
	}
);

export const fetchNearPlaces = createAsyncThunk<Place[], string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'offers/fetchNearPlaces',
	async (id, {extra: api}) => {
		const {data} = await api.get<Place[]>(`${APIRoute.Offers}/${id}/nearby`);

		return data;
	}
);

export const fetchOffers = createAsyncThunk<Place[], undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'offers/ fetchOffers',
	async(_arg, {extra: api}) => {
		const {data} = await api.get<Place[]>(APIRoute.Offers);

		return data;
	}
);

export const checkAuthStatus = createAsyncThunk<UserInfo, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'user/checkAuth',
	async(_arg, {extra: api}) => {
		const {data} = await api.get<UserInfo>(APIRoute.Login);

		return data;
	}
);

export const logIn = createAsyncThunk<UserInfo, AuthData, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'user/login',
	async({login: email, password}, {extra: api}) => {
		const {data} = await api.post<UserInfo>(APIRoute.Login, {email, password});
		saveToken(data.token);

		return data;
	}
);

export const logOut = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'user/logout',
	async(_arg, {extra: api}) => {
		await api.delete(APIRoute.Logout);
		dropToken();
	}
);

export const sendComment = createAsyncThunk<Comment, NewComment, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}
>(
	'comments/sendComment',
	async ({id, comment, rating},{extra: api}) => {
		const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});

		return data;
	}
);

export const fetchFavorites = createAsyncThunk<Place[], undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'favorite/fetchFavorites',
	async(_arg, {extra: api}) => {
		const {data} = await api.get<Place[]>(APIRoute.Favorites);

		return data;
	}
);

export const addFavorite = createAsyncThunk<Offer, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'favorite/addFavorite',
	async(id, {extra: api}) => {
		const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${id}/1`);

		return data;
	}
);

export const deleteFavorite = createAsyncThunk<Offer, string, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'favorite/deleteFavorite',
	async(id, {extra: api}) => {
		const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${id}/0`);

		return data;
	}
);
