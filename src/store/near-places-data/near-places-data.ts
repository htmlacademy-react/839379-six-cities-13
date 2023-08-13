import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { NearPlacesData } from '../../types/state';
import { fetchNearPlaces } from '../api-actions';

const initialState: NearPlacesData = {
	nearPlacesFetchingStatus: RequestStatus.IDLE,
	nearPlaces: [],
	error: null,
};

export const nearPlacesData = createSlice({
	name: NameSpace.NearPlaces,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchNearPlaces.pending, (state) => {
				state.nearPlacesFetchingStatus = RequestStatus.PENDING;
			})
			.addCase(fetchNearPlaces.fulfilled, (state, action) => {
				state.nearPlacesFetchingStatus = RequestStatus.SUCCESS;
				state.nearPlaces = action.payload;
			})
			.addCase(fetchNearPlaces.rejected, (state) => {
				state.nearPlacesFetchingStatus = RequestStatus.ERROR;
			});
	},
});
