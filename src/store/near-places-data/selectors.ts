import { NameSpace } from '../../const';
import { Place } from '../../types/place';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';

export const getNearPlaces = (state: State): Place[] => state[NameSpace.NearPlaces].nearPlaces;
export const getNearPlacesFetchingStatus = (state: State): typeof RequestStatus[keyof typeof RequestStatus] => state[NameSpace.NearPlaces].nearPlacesFetchingStatus;
