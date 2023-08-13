import { Place } from './types/place';

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const BASE_URL = 'https://13.design.pages.academy/six-cities';

const TIMEOUT = 5000;

const NameSpace = {
	User: 'USER',
	Places: 'PLACES',
	Offer: 'OFFER',
	Favorites: 'FAVORITES',
	Comments: 'COMMENTS',
	NearPlaces: 'NEAR_PLACES'
} as const;

const AppRoute = {
	Main: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
	NotFound: '*'
} as const;

const APIRoute = {
	Offers: '/offers',
	Login: '/login',
	Logout: '/logout',
	Comments: '/comments',
	Favorites: '/favorite',
};

const AuthorizationStatus = {
	Auth: 'AUTH',
	NoAuth: 'NO_AUTH',
	Unknown: 'UNKNOWN'
} as const;

const RequestStatus = {
	IDLE: 'Idle',
	PENDING: 'Pending',
	SUCCESS: 'Success',
	ERROR: 'Error',
} as const;

const SortingType = {
	Popular: 'Popular',
	LowPrice: 'Price: low to high',
	HighPrice: 'Price: high to low',
	Rating: 'Top rated first'
} as const;

const SortCallbackMap: {
	[key: string]: (arg0:Place, arg1:Place) => number;
} = {
	Popular: () => 0,
	LowPrice: (a: Place, b: Place) => a.price - b.price,
	HighPrice: (a: Place, b: Place) => b.price - a.price,
	Rating: (a: Place, b: Place) => b.rating - a.rating
};

export {cities, NameSpace, AppRoute, APIRoute, RequestStatus, AuthorizationStatus, SortingType, SortCallbackMap, BASE_URL, TIMEOUT};
