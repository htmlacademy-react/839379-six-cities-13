import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { FavoritesData } from '../../types/state';
import { fetchFavorites } from '../api-actions';

const initialState: FavoritesData = {
	favoritesFetchingStatus: RequestStatus.IDLE,
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
			});
	},
});
