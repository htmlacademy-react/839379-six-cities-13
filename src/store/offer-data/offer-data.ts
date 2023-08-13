import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData } from '../../types/state';
import { Offer } from '../../types/offer';
import { RequestStatus } from '../../const';
import { fetchOffer } from '../api-actions';

const initialState: OfferData = {
	currentOffer: {} as Offer,
	offerFetchingStatus: RequestStatus.IDLE,
	error: null,
};

export const offerData = createSlice({
	name: NameSpace.Offer,
	initialState,
	reducers : {},
	extraReducers(builder) {
		builder
			.addCase(fetchOffer.pending, (state) => {
				state.offerFetchingStatus = RequestStatus.PENDING;
			})
			.addCase(fetchOffer.fulfilled, (state, action) => {
				state.offerFetchingStatus = RequestStatus.SUCCESS;
				state.currentOffer = action.payload;
			})
			.addCase(fetchOffer.rejected, (state) => {
				state.offerFetchingStatus = RequestStatus.ERROR;
			});
	}
});
