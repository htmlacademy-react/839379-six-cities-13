import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/selectors';
import EmptyFavoritesList from '../../components/empty-favorites-list/empty-favorites-list';
import cn from 'classnames';
import PlaceCard from '../../components/place-card/place-card';

function FavoritePage(): JSX.Element {
	const favoritePlaces = useAppSelector(getFavorites);
	const uniqCities = [...new Set(favoritePlaces.map((place) => place.city.name))];

	return (
		<div className={cn(
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
														<PlaceCard key={place.id} className='favorites' info={place} width={150} height={110}/>
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
			<footer className="footer container">
				<a className="footer__logo-link" href="main.html">
					<img
						className="footer__logo"
						src="img/logo.svg"
						alt="6 cities logo"
						width={64}
						height={33}
					/>
				</a>
			</footer>
		</div>
	);
}

export default FavoritePage;
