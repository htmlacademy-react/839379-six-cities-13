import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Place } from '../../types/place';
import { RequestStatus } from '../../const';
import { SortingType } from '../../const';

export const getCurrentPlaces = (state: State): Place[] => state[NameSpace.Places].currentPlaces;

export const getCity = (state: State): string => state[NameSpace.Places].city;

export const getSort = (state: State): keyof typeof SortingType => state[NameSpace.Places].sort;

export const getPlacesFetchingStatus = (state: State): typeof RequestStatus[keyof typeof RequestStatus] => state[NameSpace.Places].placesFetchingStatus;
