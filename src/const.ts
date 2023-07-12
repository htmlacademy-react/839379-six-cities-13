const Setting = {
	OffersCount: 123
} as const;

const AppRoute = {
	Main: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer/:id',
	NotFound: '*'
} as const;

const AuthorizationStatus = {
	Auth: 'AUTH',
	NoAuth: 'NO_AUTH'
} as const;

export {Setting, AppRoute, AuthorizationStatus};
