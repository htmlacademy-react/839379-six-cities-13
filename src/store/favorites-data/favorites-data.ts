import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { FavoritesData } from '../../types/state';
import { fetchFavorites, addFavorite, deleteFavorite } from '../api-actions';
import { Place } from '../../types/place';
import { Offer } from '../../types/offer';

const serializeOffer = (offer: Offer): Place => ({
	id: offer.id,
	title: offer.title,
	type: offer.type,
	price: offer.price,
	city: {
		name: offer.city.name,
		location: {
			latitude: offer.city.location.latitude,
			longitude: offer.city.location.longitude,
			zoom: offer.city.location.zoom
		}
	},
	location: {
		latitude: offer.location.latitude,
		longitude: offer.location.longitude,
		zoom: offer.location.zoom,
	},
	isFavorite: offer.isFavorite,
	isPremium: offer.isPremium,
	rating: offer.rating,
	previewImage: offer.images[0]
});

const changeFavorites = (state: FavoritesData, offer: Offer):void => {
	const index = state.favorites.findIndex((favorite) => favorite.id === offer.id);
	state.favorites.splice(index, 1);
};

const initialState: FavoritesData = {
	favoritesFetchingStatus: RequestStatus.IDLE,
	favoriteAddingStatus: RequestStatus.IDLE,
	favoriteDeletingStatus: RequestStatus.IDLE,
	favorites: [],
	error: null
};

export const favoritesData = createSlice({
	name: NameSpace.Favorites,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchFavorites.pending, (state) => {
				state.favoritesFetchingStatus = RequestStatus.PENDING;
			})
			.addCase(fetchFavorites.fulfilled, (state, action) => {
				state.favoritesFetchingStatus = RequestStatus.SUCCESS;
				state.favorites = action.payload;
			})
			.addCase(fetchFavorites.rejected, (state) => {
				state.favoritesFetchingStatus = RequestStatus.ERROR;
			})
			.addCase(addFavorite.pending, (state) => {
				state.favoriteAddingStatus = RequestStatus.PENDING;
			})
			.addCase(addFavorite.fulfilled, (state, action) => {
				state.favoriteAddingStatus = RequestStatus.SUCCESS;
				state.favorites.push(serializeOffer(action.payload));
			})
			.addCase(addFavorite.rejected, (state) => {
				state.favoriteAddingStatus = RequestStatus.ERROR;
			})
			.addCase(deleteFavorite.pending, (state) => {
				state.favoriteDeletingStatus = RequestStatus.PENDING;
			})
			.addCase(deleteFavorite.fulfilled, (state, action) => {
				state.favoriteDeletingStatus = RequestStatus.SUCCESS;
				changeFavorites(state, action.payload);
			})
			.addCase(deleteFavorite.rejected, (state) => {
				state.favoriteDeletingStatus = RequestStatus.ERROR;
			});
	},
});

