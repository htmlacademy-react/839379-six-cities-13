import { createAction } from '@reduxjs/toolkit';
import { SortingType, AuthorizationStatus } from '../const';
import { Place } from '../types/place';


export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<keyof typeof SortingType>('changeSort');

export const loadPlaces = createAction<Place[]>('loadPlaces');

export const requireAuthorization = createAction<typeof AuthorizationStatus[keyof typeof AuthorizationStatus]>('requireAuthorization');
