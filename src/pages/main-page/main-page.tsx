import {Helmet} from 'react-helmet-async';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { Fragment, useEffect } from 'react';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import CityList from '../../components/city-list/city-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Sorting from '../../components/sorting/sorting';
import LoadingPage from '../../pages/loading-page/loading-page';
import { fetchOffers } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import useActivePlace from '../../hooks/use-active-place';
import { getCity, getCurrentPlaces, getPlacesFetchingStatus } from '../../store/places-data/selectors';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import className from 'classnames';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { pluralIntl } from '../../utils/utils';

function MainPage(): JSX.Element {
	const dispatch = useAppDispatch();
	const placesFetchingStatus = useAppSelector(getPlacesFetchingStatus);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const city = useAppSelector(getCity);
	const places = useAppSelector(getCurrentPlaces);
	const [activePlace, handleMouseOver, handleMouseOut] = useActivePlace(places);

	const getPlaceWord = (count: number) => {
		const pluralKey = pluralIntl.select(count);
		if(pluralKey === 'one') {
			return 'place';
		}
		return 'places';
	};

	useEffect(() => {
		dispatch(fetchOffers());
	}, [authorizationStatus, dispatch]);

	return (
		<Fragment>
			{placesFetchingStatus === RequestStatus.Pending && <LoadingPage/>}
			{placesFetchingStatus === RequestStatus.Success && places && (
				<div className="page page--gray page--main">
					<Helmet><title>6 cities. Main</title></Helmet>
					<Header/>
					<main className={className(
						'page__main page__main--index',
						{'page__main--index-empty': places.length === 0}
					)}
					>
						<h1 className="visually-hidden">Cities</h1>
						<CityList/>
						<div className="cities">
							{places.length === 0 ? <EmptyPlacesList/> : (
								<div className="cities__places-container container">
									<section className="cities__places places">
										<h2 className="visually-hidden">Places</h2>
										<b className="places__found">{places.length} {getPlaceWord(places.length)} to stay in {city}</b>
										<Sorting/>
										<PlaceCardList onPlace={handleMouseOver} outPlace={handleMouseOut}/>
									</section>
									<div className="cities__right-section">
										<section className="cities__map map">
											<Map places={places} activePlace={activePlace}/>
										</section>
									</div>
								</div>
							)}
						</div>
					</main>
				</div>
			)}
		</Fragment>
	);
}

export default MainPage;
