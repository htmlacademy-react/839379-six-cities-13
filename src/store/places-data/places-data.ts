import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Place } from '../../types/place';
import { SortCallbackMap } from '../../const';
import { PlacesData } from '../../types/state';
import { SortingType } from '../../const';
import { RequestStatus } from '../../const';

function getPlaces(placesList: Place[], city: string, sort = 'Popular') {
	return placesList.filter((place) => place.city.name === city).sort(SortCallbackMap[sort]);
}
import { fetchOffers } from '../api-actions';

const initialState: PlacesData = {
	city: 'Paris',
	sort: 'Popular',
	places: [],
	currentPlaces: [],
	placesFetchingStatus: RequestStatus.Idle,
};

export const placesData = createSlice({
	name: NameSpace.Places,
	initialState,
	reducers : {
		changeCity: (state, action) => {
			state.city = action.payload as string;
			state.currentPlaces = getPlaces(state.places, state.city);
		},
		changeSort: (state, action) => {
			state.sort = action.payload as keyof typeof SortingType;
			state.currentPlaces = getPlaces(state.places, state.city, action.payload as keyof typeof SortingType);
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchOffers.pending, (state) => {
				state.placesFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchOffers.fulfilled, (state, action) => {
				state.placesFetchingStatus = RequestStatus.Success;
				state.places = action.payload;
				state.currentPlaces = getPlaces(state.places, state.city);
			});
	}
});

export const {changeCity, changeSort} = placesData.actions;

