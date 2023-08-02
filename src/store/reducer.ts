import {createReducer} from '@reduxjs/toolkit';
import {places} from '../data/places';
import {Place} from '../types/place';
import {changeCity, changeSort} from './action';
import {SortCallbackMap, SortingType} from '../const';

function getPlaces(placesList: Place[], city: string, sort = 'Popular') {
	return placesList.filter((place) => place.city.name === city).sort(SortCallbackMap[sort]);
}

const initialState = {
	city: 'Paris',
	places: getPlaces(places, 'Paris', 'Popular'),
	sort: 'Popular' as keyof typeof SortingType
};


const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(changeCity, (state, action) => {
			state.city = action.payload;
			state.places = getPlaces(places, state.city);
		})
		.addCase(changeSort, (state, action) => {
			state.sort = action.payload;
			state.places = getPlaces(places, state.city, action.payload);
		});
});

export {reducer};
