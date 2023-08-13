import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userData } from './user-data/user-data';
import { placesData } from './places-data/places-data';
import { offerData } from './offer-data/offer-data';
import { commentsData } from './comments-data/comments-data';
import { nearPlacesData } from './near-places-data/near-places-data';
import { favoritesData } from './favorites-data/favorites-data';

export const rootReducer = combineReducers({
	[NameSpace.User]: userData.reducer,
	[NameSpace.Places]: placesData.reducer,
	[NameSpace.Offer]: offerData.reducer,
	[NameSpace.Comments]: commentsData.reducer,
	[NameSpace.NearPlaces]: nearPlacesData.reducer,
	[NameSpace.Favorites]: favoritesData.reducer,
});

