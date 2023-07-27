import {createReducer} from '@reduxjs/toolkit';
import {places} from '../data/places';
import {Place} from '../types/place';
import {changeCity} from './action';

function getStartPlaces(placesList: Place[], city: string) {
	return placesList.filter((place) => place.city.name === city);
}

const initialState = {
	city: 'Paris',
	places: getStartPlaces(places, 'Paris')
};


const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(changeCity, (state, action) => {
			state.city = action.payload;
			state.places = getStartPlaces(places, state.city);
		});
});

export {reducer};
