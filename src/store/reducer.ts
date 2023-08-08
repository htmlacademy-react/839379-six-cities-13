import {createReducer} from '@reduxjs/toolkit';
import {Place} from '../types/place';
import { Offer } from '../types/offer';
import { Comments } from '../types/comments';
import {loadPlaces, changeCity, changeSort, requireAuthorization, setLoadingStatus, loadCurrentOffer, loadComments, loadNearPlaces, addComment, setError} from './action';
import {AuthorizationStatus, SortCallbackMap, SortingType} from '../const';

function getPlaces(placesList: Place[], city: string, sort = 'Popular') {
	return placesList.filter((place) => place.city.name === city).sort(SortCallbackMap[sort]);
}

type InitialState = {
	city: string;
	places: Place[];
	currentPlaces: Place[];
	sort: keyof typeof SortingType;
	authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
	loadingStatus: boolean;
	currentOffer: Offer;
	comments: Comments;
	nearPlaces: Place[];
	error: string | null;
}

const initialState: InitialState = {
	city: 'Paris',
	places: [],
	currentPlaces: [],
	sort: 'Popular',
	authorizationStatus: AuthorizationStatus.Unknown,
	loadingStatus: false,
	currentOffer: {} as Offer,
	comments: [],
	nearPlaces: [],
	error: null
};


const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(changeCity, (state, action) => {
			state.city = action.payload;
			state.currentPlaces = getPlaces(state.places, state.city);
		})
		.addCase(changeSort, (state, action) => {
			state.sort = action.payload;
			state.currentPlaces = getPlaces(state.places, state.city, action.payload);
		})
		.addCase(loadPlaces, (state, action) => {
			state.places = action.payload;
			state.currentPlaces = getPlaces(state.places, state.city);
		})
		.addCase(requireAuthorization, (state, action) => {
			state.authorizationStatus = action.payload;
		})
		.addCase(setLoadingStatus, (state, action) => {
			state.loadingStatus = action.payload;
		})
		.addCase(loadCurrentOffer, (state, action) => {
			state.currentOffer = action.payload;
		})
		.addCase(loadComments, (state, action) => {
			state.comments = action.payload;
		})
		.addCase(loadNearPlaces, (state, action) => {
			state.nearPlaces = action.payload;
		})
		.addCase(addComment, (state, action) => {
			state.comments.push(action.payload);
		})
		.addCase(setError, (state, action) => {
			state.error = action.payload;
		});
});

export {reducer};
