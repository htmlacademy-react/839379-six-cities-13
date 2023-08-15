import {createReducer} from '@reduxjs/toolkit';
import {Place} from '../types/place';
import { Offer } from '../types/offer';
import { Comments } from '../types/comments';
import {loadPlaces, changeCity, changeSort, requireAuthorization, loadCurrentOffer, loadComments, loadNearPlaces, addComment, setError} from './action';
import { fetchOffer, fetchComments, fetchNearPlaces, fetchOffers, sendComment} from './api-actions';
import {AuthorizationStatus, RequestStatus, SortCallbackMap, SortingType} from '../const';

function getPlaces(placesList: Place[], city: string, sort = 'Popular') {
	return placesList.filter((place) => place.city.name === city).sort(SortCallbackMap[sort]);
}

type InitialState = {
	city: string;
	places: Place[];
	currentPlaces: Place[];
	sort: keyof typeof SortingType;
	authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
	currentOffer: Offer;
	offerFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	commentsFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	nearPlacesFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	placesFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	comments: Comments;
	commentSendingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	nearPlaces: Place[];
	error: string | null;
}

const initialState: InitialState = {
	city: 'Paris',
	places: [],
	currentPlaces: [],
	sort: 'Popular',
	authorizationStatus: AuthorizationStatus.Unknown,
	currentOffer: {} as Offer,
	offerFetchingStatus: RequestStatus.IDLE,
	commentsFetchingStatus: RequestStatus.IDLE,
	nearPlacesFetchingStatus: RequestStatus.IDLE,
	placesFetchingStatus: RequestStatus.IDLE,
	comments: [],
	commentSendingStatus: RequestStatus.IDLE,
	nearPlaces: [],
	error: null
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
		.addCase(loadCurrentOffer, (state, action) => {
			state.currentOffer = action.payload;
		})
		.addCase(loadComments, (state, action) => {
			state.comments = action.payload;
		})
		.addCase(loadNearPlaces, (state, action) => {
			state.nearPlaces = action.payload;
		})
		.addCase(addComment, (state, action) => {
			state.comments.push(action.payload);
		})
		.addCase(setError, (state, action) => {
			state.error = action.payload;
		})
		.addCase(fetchOffer.pending, (state) => {
			state.offerFetchingStatus = RequestStatus.PENDING;
		})
		.addCase(fetchOffer.fulfilled, (state) => {
			state.offerFetchingStatus = RequestStatus.SUCCESS;
		})
		.addCase(fetchOffer.rejected, (state) => {
			state.offerFetchingStatus = RequestStatus.ERROR;
		})
		.addCase(fetchComments.pending, (state) => {
			state.commentsFetchingStatus = RequestStatus.PENDING;
		})
		.addCase(fetchComments.fulfilled, (state) => {
			state.commentsFetchingStatus = RequestStatus.SUCCESS;
		})
		.addCase(fetchComments.rejected, (state) => {
			state.commentsFetchingStatus = RequestStatus.ERROR;
		})
		.addCase(fetchNearPlaces.pending, (state) => {
			state.nearPlacesFetchingStatus = RequestStatus.PENDING;
		})
		.addCase(fetchNearPlaces.fulfilled, (state) => {
			state.nearPlacesFetchingStatus = RequestStatus.SUCCESS;
		})
		.addCase(fetchNearPlaces.rejected, (state) => {
			state.nearPlacesFetchingStatus = RequestStatus.ERROR;
		})
		.addCase(fetchOffers.pending, (state) => {
			state.placesFetchingStatus = RequestStatus.PENDING;
		})
		.addCase(fetchOffers.fulfilled, (state) => {
			state.placesFetchingStatus = RequestStatus.SUCCESS;
		})
		.addCase(fetchOffers.rejected, (state) => {
			state.placesFetchingStatus = RequestStatus.ERROR;
		})
		.addCase(sendComment.pending, (state) => {
			state.commentSendingStatus = RequestStatus.PENDING;
		})
		.addCase(sendComment.fulfilled, (state) => {
			state.commentSendingStatus = RequestStatus.SUCCESS;
		})
		.addCase(sendComment.rejected, (state) => {
			state.commentSendingStatus = RequestStatus.ERROR;
		});
});

export {reducer};
