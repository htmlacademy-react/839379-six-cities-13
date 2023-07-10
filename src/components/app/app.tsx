import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritePage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {HelmetProvider} from 'react-helmet-async';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route path={AppRoute.Main} element={<MainPage offersCount={offersCount}/>}/>
					<Route path={AppRoute.Login} element={<LoginPage/>}/>
					<Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><FavoritePage/></PrivateRoute>}/>
					<Route path={AppRoute.Offer} element={<OfferPage/>}/>
					<Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
