import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesFetchingStatus } from '../../store/favorites-data/selectors';
import EmptyFavoritesList from '../../components/empty-favorites-list/empty-favorites-list';
import className from 'classnames';
import PlaceCard from '../../components/place-card/place-card';
import Footer from '../../components/footer/footer';
import { RequestStatus } from '../../const';
import LoadingPage from '../loading-page/loading-page';

function FavoritePage(): JSX.Element {
	const favoritesFetchingStatus = useAppSelector(getFavoritesFetchingStatus);
	const favoritePlaces = useAppSelector(getFavorites);
	const uniqCities = [...new Set(favoritePlaces.map((place) => place.city.name))];

	if(favoritesFetchingStatus === RequestStatus.Pending) {
		return <LoadingPage/>;
	}

	return (
		<div className={className(
			'page',
			{'page--favorites-empty': favoritePlaces.length === 0}
		)}
		>
			<Helmet><title>6 cities. Favorites</title></Helmet>
			<Header/>
			{favoritePlaces.length === 0 ? <EmptyFavoritesList/> : (
				<main className="page__main page__main--favorites">
					<div className="page__favorites-container container">
						<section className="favorites">
							<h1 className="favorites__title">Saved listing</h1>
							<ul className="favorites__list">
								{uniqCities.map((city) => {
									const keyValue = city;

									return (
										<li key={keyValue} className="favorites__locations-items">
											<div className="favorites__locations locations locations--current">
												<div className="locations__item">
													<a className="locations__item-link" href="#">
														<span>{city}</span>
													</a>
												</div>
											</div>
											<div className="favorites__places">
												{favoritePlaces
													.filter((place) => place.city.name === city)
													.map((place) => (
														<PlaceCard key={place.id} blockName='favorites' info={place} width={150} height={110}/>
													))}
											</div>
										</li>
									);
								})}
							</ul>
						</section>
					</div>
				</main>
			)}
			<Footer favorites={favoritePlaces}/>
		</div>
	);
}

export default FavoritePage;
