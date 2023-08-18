import {Routes, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritePage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {HelmetProvider} from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { useEffect } from 'react';
import { fetchFavorites } from '../../store/api-actions';

function App(): JSX.Element {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if(authorizationStatus === AuthorizationStatus.Auth) {
			dispatch(fetchFavorites());
		}
	}, [authorizationStatus, dispatch]);

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
