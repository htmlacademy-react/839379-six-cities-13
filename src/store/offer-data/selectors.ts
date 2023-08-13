import { NameSpace, RequestStatus } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';

export const getOfferFetchingStatus = (state: State): typeof RequestStatus[keyof typeof RequestStatus] => state[NameSpace.Offer].offerFetchingStatus;
export const getOffer = (state: State): Offer => state[NameSpace.Offer].currentOffer;
