export type Place = {
	id: string;
	title: string;
	type: string;
	price: number;
	previewImage: string;
	city: City;
	location: PointLocation;
	isFavorite?: boolean;
	isPremium: boolean;
	rating: number;
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


