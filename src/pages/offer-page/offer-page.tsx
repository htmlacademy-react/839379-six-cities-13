import {Helmet} from 'react-helmet-async';
import cn from 'classnames';
import CommentForm from '../../components/form/comment-form';
import Header from '../../components/header/header';
import ReviewList from '../../components/reviews/review-list';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places/near-places-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingPage from '../loading-page/loading-page';
import { RequestStatus } from '../../const';
import { Fragment } from 'react';
import { fetchComments, fetchNearPlaces, fetchOffer } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function OfferPage(): JSX.Element {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const offerFetchingStatus = useAppSelector((state) => state.offerFetchingStatus);
	const commentFetchingStatus = useAppSelector((state) => state.commentsFetchingStatus);
	const nearPlacesFetchingStatus = useAppSelector((state) => state.nearPlacesFetchingStatus);
	const currentOffer = useAppSelector((state) => state.currentOffer);
	const comments = useAppSelector((state) => state.comments);
	const nearPlaces = useAppSelector((state) => state.nearPlaces);
	const {title, type, price, isFavorite, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = currentOffer;


	useEffect(() => {
		if(id) {
			dispatch(fetchOffer(id));
			dispatch(fetchComments(id));
			dispatch(fetchNearPlaces(id));
		}
	}, [id, dispatch]);

	return (
		<Fragment>
			{offerFetchingStatus === RequestStatus.PENDING || commentFetchingStatus === RequestStatus.PENDING || nearPlacesFetchingStatus === RequestStatus.PENDING && <LoadingPage/>}
			{offerFetchingStatus === RequestStatus.SUCCESS && currentOffer && (
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
										{commentFetchingStatus === RequestStatus.SUCCESS && comments && <CommentForm id={id}/>}
									</section>
								</div>
							</div>
							<section className="offer__map map">
								{nearPlacesFetchingStatus === RequestStatus.SUCCESS && nearPlaces && (
									<Map places={nearPlaces}/>
								)}
							</section>
						</section>
						<div className="container">
							<section className="near-places places">
								<h2 className="near-places__title">
									Other places in the neighbourhood
								</h2>
								{nearPlacesFetchingStatus === RequestStatus.SUCCESS && nearPlaces && (
									<NearPlacesList places={nearPlaces}/>
								)}
							</section>
						</div>
					</main>
				</div>
			)}
		</Fragment>
	);
}
export default OfferPage;
