import {Helmet} from 'react-helmet-async';
import {Place} from '../../types/place';
import PlaceCardList from '../../components/place-card/place-card-list';
import { useState } from 'react';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import CityList from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';
import Sorting from '../../components/sorting/sorting';
import LoadingPage from '../../pages/loading-page/loading-page';

function MainPage(): JSX.Element {
	const isDataLoading = useAppSelector((state) => state.loadingStatus);
	const city = useAppSelector((state) => state.city);
	const places = useAppSelector((state) => state.currentPlaces);
	const [activePlace, setActivePlace] = useState<Place | undefined>(undefined);

	function handleMouseOver(id:string) {
		const currentPlace = places.find((place) => place.id === id);
		setActivePlace(currentPlace);
	}

	function handleMouseOut() {
		setActivePlace(undefined);
	}

	if(isDataLoading) {
		return <LoadingPage/>;
	}

	return (
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
	);
}

export default MainPage;
