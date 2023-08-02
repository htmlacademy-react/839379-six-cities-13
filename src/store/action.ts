import { createAction } from '@reduxjs/toolkit';
import { SortingType } from '../const';


export const changeCity = createAction('changeCity', (city: string) => ({payload: city}));

export const getOfferList = createAction('getOfferList');

export const changeSort = createAction('changeSort', (sort: keyof typeof SortingType) => ({payload: sort}));
