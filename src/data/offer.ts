import { Offer } from '../types/offer';

const offer: Offer = {
	id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
	title: 'Beautiful & luxurious studio at great location',
	type: 'apartment',
	price: 120,
	city: {
		name: 'Amsterdam',
		location: {
			latitude: 52.35514938496378,
			longitude: 4.673877537499948,
			zoom: 8
		}
	},
	location: {
		latitude: 52.35514938496378,
		longitude: 4.673877537499948,
		zoom: 8
	},
	isFavorite: true,
	isPremium: true,
	rating: 4,
	description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
	bedrooms: 3,
	goods: [
		'Heating'
	],
	host: {
		name: 'Oliver Conner',
		avatarUrl: 'https://i.pravatar.cc/?img=5',
		isPro: true
	},
	images: [
		'https://13.design.pages.academy/static/hotel/4.jpg',
		'https://13.design.pages.academy/static/hotel/2.jpg',
		'https://13.design.pages.academy/static/hotel/5.jpg',
		'https://13.design.pages.academy/static/hotel/6.jpg'
	],
	maxAdults: 4
};

export {offer};
