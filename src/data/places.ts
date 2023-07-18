import {Place} from '../types/place';

const places: Place[] = [
	{
		id: '3d3a815c-5622-4ccb-8a0d-4bfccf3cea5a',
		title: 'Amazing and Extremely Central Flat',
		type: 'room',
		price: 118,
		previewImage: 'https://13.design.pages.academy/static/hotel/2.jpg',
		city: {
			name: 'Paris',
			location: {
				latitude: 52.3909553943508,
				longitude: 4.85309666406198,
				zoom: 13
			}
		},
		location: {
			latitude: 48.868610000000004,
			longitude: 2.342499,
			zoom: 16
		},
		isFavorite: true,
		isPremium: true,
		rating: 4.2
	},
	{
		id: '571faaa9-b1a2-44fa-9bf1-d6374438c4ad',
		title: 'Waterfront with extraordinary view',
		type: 'house',
		price: 349,
		previewImage: 'https://13.design.pages.academy/static/hotel/6.jpg',
		city: {
			name: 'Paris',
			location: {
				latitude: 52.3609553943508,
				longitude: 4.85309666406198,
				zoom: 13
			}
		},
		location: {
			latitude: 48.858610000000006,
			longitude: 2.330499,
			zoom: 16
		},
		isFavorite: true,
		isPremium: true,
		rating: 2
	},
	{
		id: '9811e66b-5183-449f-b034-0051c8c714f0',
		title: 'Waterfront with extraordinary view',
		type: 'house',
		price: 956,
		previewImage: 'https://13.design.pages.academy/static/hotel/9.jpg',
		city: {
			name: 'Brussels',
			location: {
				latitude: 52.3909553943508,
				longitude: 4.929309666406198,
				zoom: 13
			}
		},
		location: {
			latitude: 48.834610000000005,
			longitude: 2.335499,
			zoom: 16
		},
		isFavorite: true,
		isPremium: false,
		rating: 4.6
	},
	{
		id: '81a9ee43-a209-431e-8766-60489d6826ce',
		title: 'Canal View Prinsengracht',
		type: 'room',
		price: 223,
		previewImage: 'https://13.design.pages.academy/static/hotel/4.jpg',
		city: {
			name: 'Hamburg',
			location: {
				latitude: 52.3809553943508,
				longitude: 4.939309666406198,
				zoom: 13
			}
		},
		location: {
			latitude: 48.85761,
			longitude: 2.358499,
			zoom: 16
		},
		isFavorite: true,
		isPremium: true,
		rating: 4.1
	},
];

export {places};
