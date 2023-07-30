const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const AppRoute = {
	Main: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
	NotFound: '*'
} as const;

const AuthorizationStatus = {
	Auth: 'AUTH',
	NoAuth: 'NO_AUTH'
} as const;

const SortingType = {
	Popular: 'Popular',
	LowPrice: 'Price: low to high',
	HighPrice: 'Price: high to low',
	Rating: 'Top rated first'
} as const;

export {cities, AppRoute, AuthorizationStatus, SortingType};
