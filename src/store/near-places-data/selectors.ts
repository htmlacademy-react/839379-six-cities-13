import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getNearPlaces = (state: State) => state[NameSpace.NearPlaces].nearPlaces;
export const getNearPlacesFetchingStatus = (state: State) => state[NameSpace.NearPlaces].nearPlacesFetchingStatus;
