import { createAction } from '@reduxjs/toolkit';
import { SortingType, AuthorizationStatus } from '../const';
import { Place } from '../types/place';
import { Offer } from '../types/offer';
import { Comments } from '../types/comments';


export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<keyof typeof SortingType>('changeSort');

export const loadPlaces = createAction<Place[]>('loadPlaces');

export const requireAuthorization = createAction<typeof AuthorizationStatus[keyof typeof AuthorizationStatus]>('requireAuthorization');

export const setLoadingStatus = createAction<boolean>('setLoadingStatus');

export const loadCurrentOffer = createAction<Offer>('loadCurrentOffer');

export const loadComments = createAction<Comments>('loadComments');

export const loadNearPlaces = createAction<Place[]>('loadNearPlaces');
