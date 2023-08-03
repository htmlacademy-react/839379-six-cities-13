import {createReducer} from '@reduxjs/toolkit';
import {places} from '../data/places';
import {Place} from '../types/place';
import {LoadPlaces, changeCity, changeSort} from './action';
import {SortCallbackMap, SortingType} from '../const';

function getPlaces(placesList: Place[], city: string, sort = 'Popular') {
	return placesList.filter((place) => place.city.name === city).sort(SortCallbackMap[sort]);
}

const initialState = {
	city: 'Paris',
	places,
	currentPlaces: [] as Place[],
	sort: 'Popular' as keyof typeof SortingType
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
		.addCase(LoadPlaces, (state, action) => {
			state.places = action.payload;
		});
});

export {reducer};
