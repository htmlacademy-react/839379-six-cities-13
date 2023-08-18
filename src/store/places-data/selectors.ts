import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentPlaces = (state: State) => state[NameSpace.Places].currentPlaces;

export const getCity = (state: State) => state[NameSpace.Places].city;

export const getSort = (state: State) => state[NameSpace.Places].sort;

export const getPlacesFetchingStatus = (state: State) => state[NameSpace.Places].placesFetchingStatus;
