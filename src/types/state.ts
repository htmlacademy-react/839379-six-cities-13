import {store} from '../store';
import { Place } from './place';
import { SortingType } from '../const';
import { RequestStatus } from '../const';
import { AuthorizationStatus } from '../const';
import { Offer } from './offer';
import { Comments } from './comments';
import { UserInfo } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserData = {
	user: UserInfo;
	authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
	checkAuthStatus: typeof RequestStatus[keyof typeof RequestStatus];
	error: string | null;
};

export type PlacesData = {
	city: string;
	places: Place[];
	currentPlaces: Place[];
	sort: keyof typeof SortingType;
	placesFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	error: string | null;
};

export type OfferData = {
	currentOffer: Offer;
	offerFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	error: string | null;
}

export type CommentsData = {
	commentsFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	comments: Comments;
	commentSendingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	error: string | null;
}

export type NearPlacesData = {
	nearPlacesFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	nearPlaces: Place[];
	error: string | null;
}

export type FavoritesData = {
	favoritesFetchingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	favoriteAddingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	favoriteDeletingStatus: typeof RequestStatus[keyof typeof RequestStatus];
	favorites: Place[];
	error: string | null;
}
