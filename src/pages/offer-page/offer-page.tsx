import {Helmet} from 'react-helmet-async';
import CommentForm from '../../components/form/comment-form';
import Header from '../../components/header/header';
import ReviewList from '../../components/reviews/review-list';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places/near-places-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingPage from '../loading-page/loading-page';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { fetchComments, fetchNearPlaces, fetchOffer } from '../../store/api-actions';
import { Navigate, useParams } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { getOffer, getOfferFetchingStatus } from '../../store/offer-data/selectors';
import { getNearPlaces, getNearPlacesFetchingStatus } from '../../store/near-places-data/selectors';
import { getCommentsFetchingStatus } from '../../store/comments-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import { capitalize, getRandomSlice } from '../../utils/utils';

function OfferPage(): JSX.Element | undefined {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const offerFetchingStatus = useAppSelector(getOfferFetchingStatus);
	const commentFetchingStatus = useAppSelector(getCommentsFetchingStatus);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const nearPlacesFetchingStatus = useAppSelector(getNearPlacesFetchingStatus);
	const currentOffer = useAppSelector(getOffer);
	const nearPlaces = useAppSelector(getNearPlaces);
	const randomNearPlaces = getRandomSlice(3, nearPlaces);
	const {title, type, price, isFavorite, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = currentOffer;

	useEffect(() => {
		if(id) {
			Promise.all([
				dispatch(fetchOffer(id)),
				dispatch(fetchComments(id)),
				dispatch(fetchNearPlaces(id))
			]);
		}
	}, [authorizationStatus, id, dispatch]);

	if(offerFetchingStatus === RequestStatus.ERROR) {
		return <Navigate to={AppRoute.NotFound}/>;
	}

	return (
		<Fragment>
			{(offerFetchingStatus === RequestStatus.PENDING || commentFetchingStatus === RequestStatus.PENDING || nearPlacesFetchingStatus === RequestStatus.PENDING) && <LoadingPage/>}
			{offerFetchingStatus === RequestStatus.SUCCESS && (
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
										<BookmarkButton id={id as string} isFavorite={isFavorite} block='offer' size='large'/>
									</div>
									<div className="offer__rating rating">
										<div className="offer__stars rating__stars">
											<span style={{width: `${Math.round(rating) * 20}%`}} />
											<span className="visually-hidden">Rating</span>
										</div>
										<span className="offer__rating-value rating__value">{rating}</span>
									</div>
									<ul className="offer__features">
										<li className="offer__feature offer__feature--entire">{capitalize(type)}</li>
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
											{goods.map((good)=> (
												<li key={good} className="offer__inside-item">{capitalize(good)}</li>
											))}
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
										{commentFetchingStatus === RequestStatus.SUCCESS && <ReviewList/>}
										{authorizationStatus === AuthorizationStatus.Auth && <CommentForm id={id}/>}
									</section>
								</div>
							</div>
							<section className="offer__map map">
								{nearPlacesFetchingStatus === RequestStatus.SUCCESS && randomNearPlaces && currentOffer && (
									<Map places={[...randomNearPlaces, currentOffer]} activePlace={currentOffer}/>
								)}
							</section>
						</section>
						<div className="container">
							<section className="near-places places">
								<h2 className="near-places__title">
									Other places in the neighbourhood
								</h2>
								{nearPlacesFetchingStatus === RequestStatus.SUCCESS && nearPlaces && (
									<NearPlacesList places={randomNearPlaces}/>
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
