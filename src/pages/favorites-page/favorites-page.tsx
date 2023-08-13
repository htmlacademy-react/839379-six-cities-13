import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/selectors';

function FavoritePage(): JSX.Element {
	const favoritePlaces = useAppSelector(getFavorites);
	const uniqCities = [...new Set(favoritePlaces.map((place) => place.city.name))];

	return (
		<div className="page">
			<Helmet><title>6 cities. Favorites</title></Helmet>
			<Header/>
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
													<article key={place.id} className="favorites__card place-card">
														{place.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
														<div className="favorites__image-wrapper place-card__image-wrapper">
															<a href="#">
																<img
																	className="place-card__image"
																	src={place.previewImage}
																	width={150}
																	height={110}
																	alt="Place image"
																/>
															</a>
														</div>
														<div className="favorites__card-info place-card__info">
															<div className="place-card__price-wrapper">
																<div className="place-card__price">
																	<b className="place-card__price-value">€{place.price}</b>
																	<span className="place-card__price-text">
																		/&nbsp;night
																	</span>
																</div>
																<button
																	className="place-card__bookmark-button place-card__bookmark-button--active button"
																	type="button"
																>
																	<svg
																		className="place-card__bookmark-icon"
																		width={18}
																		height={19}
																	>
																		<use xlinkHref="#icon-bookmark" />
																	</svg>
																	<span className="visually-hidden">In bookmarks</span>
																</button>
															</div>
															<div className="place-card__rating rating">
																<div className="place-card__stars rating__stars">
																	<span style={{ width: `${place.rating * 20}%`}} />
																	<span className="visually-hidden">Rating</span>
																</div>
															</div>
															<h2 className="place-card__name">
																<a href="#">{place.title}</a>
															</h2>
															<p className="place-card__type">{place.type}</p>
														</div>
													</article>
												))}
										</div>
									</li>
								);
							})}
						</ul>
					</section>
				</div>
			</main>
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
