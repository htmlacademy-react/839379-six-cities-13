export type Offer = {
	id: string;
	title: string;
	type: string;
	price: number;
	city: City;
	location: PointLocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	description: string;
	bedrooms: number;
	goods: string[];
	host: Host;
	images: string[];
	maxAdults: number;
}

export type City = {
	name: string;
	location: PointLocation;
}

export type PointLocation = {
	latitude: number;
	longitude: number;
	zoom: number;
}

export type Host = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
}
