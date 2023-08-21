import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOfferFetchingStatus = (state: State) => state[NameSpace.Offer].offerFetchingStatus;
export const getOffer = (state: State) => state[NameSpace.Offer].currentOffer;
