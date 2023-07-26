import {createReducer} from '@reduxjs/toolkit';
import {places} from '../data/places';
import {Place} from '../types/place';
import {changeCity} from './action';

function getStartPlaces(placesList: Place[]) {
	return placesList.filter((place) => place.city.name === 'Paris');
}

const initialState = {
	city: 'Paris',
	places: getStartPlaces(places)
};


const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(changeCity, (state, action) => {
			state.city = action.payload;
		});
});

export {reducer};
