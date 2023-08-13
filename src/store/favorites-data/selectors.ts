import { NameSpace } from '../../const';
import { Place } from '../../types/place';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';

export const getFavorites = (state: State): Place[] => state[NameSpace.Favorites].favorites;

export const getFavoritesFetchingStatus = (state: State):typeof RequestStatus[keyof typeof RequestStatus] => state[NameSpace.Favorites].favoritesFetchingStatus;

