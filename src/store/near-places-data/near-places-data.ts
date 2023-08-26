import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { NearPlacesData } from '../../types/state';
import { fetchNearPlaces } from '../api-actions';

const initialState: NearPlacesData = {
	nearPlacesFetchingStatus: RequestStatus.Idle,
	nearPlaces: [],
};

export const nearPlacesData = createSlice({
	name: NameSpace.NearPlaces,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchNearPlaces.pending, (state) => {
				state.nearPlacesFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchNearPlaces.fulfilled, (state, action) => {
				state.nearPlacesFetchingStatus = RequestStatus.Success;
				state.nearPlaces = action.payload;
			});
	},
});
