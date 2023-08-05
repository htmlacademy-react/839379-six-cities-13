import {createReducer} from '@reduxjs/toolkit';
import {Place} from '../types/place';
import {loadPlaces, changeCity, changeSort, requireAuthorization, setLoadingStatus} from './action';
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
	loadingStatus: false
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
		});
});

export {reducer};
