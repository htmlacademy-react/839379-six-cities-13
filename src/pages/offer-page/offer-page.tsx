import {Helmet} from 'react-helmet-async';
import cn from 'classnames';
import CommentForm from '../../components/form/comment-form';
import { Offer } from '../../types/offer';
import { Comments } from '../../types/comments';
import { Place } from '../../types/place';
import Header from '../../components/header/header';
import ReviewList from '../../components/reviews/review-list';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places/near-places-list';

type OfferPageProps = {
	offer: Offer;
	comments: Comments;
	places: Place[];
}

function OfferPage({offer, comments, places}: OfferPageProps): JSX.Element {
	const {title, type, price, isFavorite, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = offer;

	return (
		<div className="page">
			<Helmet><title>6 cities. Offer</title></Helmet>
			<Header/>
			<main className="page__main page__main--offer">
				<section className="offer">
					<div className="offer__gallery-container container">
						<div className="offer__gallery">
							{images.map((image) => (
								<div key={image} className="offer__image-wrapper">
									<img
										className="offer__image"
										src={image}
										alt="Photo studio"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="offer__container container">
						<div className="offer__wrapper">
							{isPremium && <div className="offer__mark"><span>Premium</span></div>}
							<div className="offer__name-wrapper">
								<h1 className="offer__name">{title}</h1>
								<button
									className={cn(
										'offer__bookmark-button button',
										{'offer__bookmark-button--active': isFavorite}
									)}
									type="button"
								>
									<svg className="offer__bookmark-icon" width={31} height={33}>
										<use xlinkHref="#icon-bookmark" />
									</svg>
									<span className="visually-hidden">To bookmarks</span>
								</button>
							</div>
							<div className="offer__rating rating">
								<div className="offer__stars rating__stars">
									<span style={{width: `${rating * 20}%`}} />
									<span className="visually-hidden">Rating</span>
								</div>
								<span className="offer__rating-value rating__value">{rating}</span>
							</div>
							<ul className="offer__features">
								<li className="offer__feature offer__feature--entire">{type}</li>
								<li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
								<li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
								</li>
							</ul>
							<div className="offer__price">
								<b className="offer__price-value">€{price}</b>
								<span className="offer__price-text">&nbsp;night</span>
							</div>
							<div className="offer__inside">
								<h2 className="offer__inside-title">What&#39;s inside</h2>
								<ul className="offer__inside-list">
									{goods.map((good, index)=> {
										const keyValue = index;
										return (
											<li key={keyValue} className="offer__inside-item">{good}</li>
										);
									})}
								</ul>
							</div>
							<div className="offer__host">
								<h2 className="offer__host-title">Meet the host</h2>
								<div className="offer__host-user user">
									<div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
										<img
											className="offer__avatar user__avatar"
											src={host.avatarUrl}
											width={74}
											height={74}
											alt={host.name}
										/>
									</div>
									<span className="offer__user-name">{host.name}</span>
									{host.isPro && <span className="offer__user-status">Pro</span>}
								</div>
								<div className="offer__description">
									<p className="offer__text">{description}</p>
								</div>
							</div>
							<section className="offer__reviews reviews">
								<ReviewList comments={comments}/>
								<CommentForm/>
							</section>
						</div>
					</div>
					<section className="offer__map map">
						<Map/>
					</section>
				</section>
				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">
              Other places in the neighbourhood
						</h2>
						<NearPlacesList places={places.slice(1)}/>
					</section>
				</div>
			</main>
		</div>
	);
}
export default OfferPage;
