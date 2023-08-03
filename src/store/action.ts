import { createAction } from '@reduxjs/toolkit';
import { SortingType } from '../const';
import { Place } from '../types/place';


export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<keyof typeof SortingType>('changeSort');

export const LoadPlaces = createAction<Place[]>('loadPlaces');
