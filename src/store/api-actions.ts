import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { loadPlaces, setLoadingStatus } from './action';
import { Place } from '../types/place';

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
