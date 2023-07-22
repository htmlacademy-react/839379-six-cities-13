import { Place } from './place';

export type Offer = Omit<Place, 'previewImage'> & {
	description: string;
	bedrooms: number;
	goods: string[];
	host: Host;
	images: string[];
	maxAdults: number;
}

export type Host = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
}
