import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData } from '../../types/state';
import { Offer } from '../../types/offer';
import { RequestStatus } from '../../const';
import { fetchOffer } from '../api-actions';

const initialState: OfferData = {
	currentOffer: {} as Offer,
	offerFetchingStatus: RequestStatus.Idle,
};

export const offerData = createSlice({
	name: NameSpace.Offer,
	initialState,
	reducers : {},
	extraReducers(builder) {
		builder
			.addCase(fetchOffer.pending, (state) => {
				state.offerFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchOffer.fulfilled, (state, action) => {
				state.offerFetchingStatus = RequestStatus.Success;
				state.currentOffer = action.payload as Offer;
			})
			.addCase(fetchOffer.rejected, (state) => {
				state.offerFetchingStatus = RequestStatus.Error;
			});
	}
});
