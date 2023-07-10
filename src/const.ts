const Setting = {
	OffersCount: 123
} as const;

enum AppRoute {
	Main = '/',
	Login = '/login',
	Favorites = '/favorites',
	Offer = '/offer/:id',
	NotFound = '*'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH'
}

export {Setting, AppRoute, AuthorizationStatus};
