import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;

export const getFavoritesFetchingStatus = (state: State) => state[NameSpace.Favorites].favoritesFetchingStatus;

export const getFavoriteAddingStatus = (state: State) => state[NameSpace.Favorites].favoriteAddingStatus;

export const getFavoriteDeletingStatus = (state: State) => state[NameSpace.Favorites].favoriteDeletingStatus;
