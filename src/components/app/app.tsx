import {Routes, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritePage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';
import {HelmetProvider} from 'react-helmet-async';

function App(): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route path={AppRoute.Main} element={<MainPage/>}/>
					<Route path={AppRoute.Login} element={<LoginPage/>}/>
					<Route path={AppRoute.Favorites} element={<PrivateRoute><FavoritePage/></PrivateRoute>}/>
					<Route path={`${AppRoute.Offer}/:id`} element={<OfferPage/>}/>
					<Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
