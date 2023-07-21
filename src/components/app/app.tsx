import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritePage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {HelmetProvider} from 'react-helmet-async';
import {Place} from '../../types/place';
import { Offer } from '../../types/offer';
import {Comments} from '../../types/comments';

type AppProps = {
  offersCount: number;
	places: Place[];
	offer: Offer;
	comments: Comments;
}

function App({offersCount, places, offer, comments}: AppProps): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route path={AppRoute.Main} element={<MainPage offersCount={offersCount} places={places}/>}/>
					<Route path={AppRoute.Login} element={<LoginPage/>}/>
					<Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><FavoritePage places={places}/></PrivateRoute>}/>
					<Route path={`${AppRoute.Offer}/:id`} element={<OfferPage offer={offer} comments={comments} places={places}/>}/>
					<Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
