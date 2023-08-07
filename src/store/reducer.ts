import {createReducer} from '@reduxjs/toolkit';
import {Place} from '../types/place';
import { Offer } from '../types/offer';
import {loadPlaces, changeCity, changeSort, requireAuthorization, setLoadingStatus, loadCurrentOffer} from './action';
import {AuthorizationStatus, SortCallbackMap, SortingType} from '../const';

function getPlaces(placesList: Place[], city: string, sort = 'Popular') {
	return placesList.filter((place) => place.city.name === city).sort(SortCallbackMap[sort]);
}

const initialState = {
	city: 'Paris',
	places: [] as Place[],
	currentPlaces: [] as Place[],
	sort: 'Popular' as keyof typeof SortingType,
	authorizationStatus: AuthorizationStatus.Unknown as typeof AuthorizationStatus[keyof typeof AuthorizationStatus],
	loadingStatus: false,
	currentOffer: {} as Offer,
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
		});
});

export {reducer};
