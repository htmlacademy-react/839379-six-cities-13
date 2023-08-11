import {Helmet} from 'react-helmet-async';
import {Place} from '../../types/place';
import PlaceCardList from '../../components/place-card/place-card-list';
import { Fragment, useEffect, useState } from 'react';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import CityList from '../../components/city-list/city-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Sorting from '../../components/sorting/sorting';
import LoadingPage from '../../pages/loading-page/loading-page';
import { fetchOffers } from '../../store/api-actions';
import { RequestStatus } from '../../const';

function MainPage(): JSX.Element {
	const dispatch = useAppDispatch();
	const placesFetchingStatus = useAppSelector((state) => state.placesFetchingStatus);
	const city = useAppSelector((state) => state.city);
	const places = useAppSelector((state) => state.currentPlaces);
	const [activePlace, setActivePlace] = useState<Place | undefined>(undefined);

	useEffect(() => {
		dispatch(fetchOffers());
	}, [dispatch]);

	function handleMouseOver(id:string) {
		const currentPlace = places.find((place) => place.id === id);
		setActivePlace(currentPlace);
	}

	function handleMouseOut() {
		setActivePlace(undefined);
	}

	return (
		<Fragment>
			{placesFetchingStatus === RequestStatus.PENDING && <LoadingPage/>}
			{placesFetchingStatus === RequestStatus.SUCCESS && places && (
				<div className="page page--gray page--main">
					<Helmet><title>6 cities. Main</title></Helmet>
					<Header/>
					<main className="page__main page__main--index">
						<h1 className="visually-hidden">Cities</h1>
						<CityList/>
						<div className="cities">
							<div className="cities__places-container container">
								<section className="cities__places places">
									<h2 className="visually-hidden">Places</h2>
									<b className="places__found">{places.length} places to stay in {city}</b>
									<Sorting/>
									<PlaceCardList onPlace={handleMouseOver} outPlace={handleMouseOut}/>
								</section>
								<div className="cities__right-section">
									<section className="cities__map map">
										<Map places={places} activePlace={activePlace}/>
									</section>
								</div>
							</div>
						</div>
					</main>
				</div>
			)}
		</Fragment>
	);
}

export default MainPage;
