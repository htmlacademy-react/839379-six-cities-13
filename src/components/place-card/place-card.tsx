import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Place} from '../../types/place';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { fetchCurrentOffer } from '../../store/api-actions';

type PlaceCardProps = {
	className: string;
	info: Place;
	onPlace?: (info:string) => void;
	outPlace?: () => void;
}

function PlaceCard({className, info, onPlace, outPlace}:PlaceCardProps): JSX.Element {
	const {id, price, title, type, previewImage, isPremium, isFavorite, rating} = info;
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(fetchCurrentOffer(id));
	};

	return (
		<article
			onMouseOver={onPlace ? () => onPlace(id) : undefined}
			onMouseOut={outPlace ? () => outPlace() : undefined}
			className={`${className}__card place-card`}
		>
			{isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className={`${className}__image-wrapper place-card__image-wrapper`}>
				<Link onClick={handleClick} to={`${AppRoute.Offer}/${id}`}>
					<img
						className="place-card__image"
						src={previewImage}
						width={260}
						height={200}
						alt="Place image"
					/>
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<button
						className={cn(
							'place-card__bookmark-button button',
							{'place-card__bookmark-button--active': isFavorite}
						)}
						type="button"
					>
						<svg
							className="place-card__bookmark-icon"
							width={18}
							height={19}
						>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">To bookmarks</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link onClick={handleClick} to={`${AppRoute.Offer}/${id}`}>{title}</Link>
				</h2>
				<p className="place-card__type">{type}</p>
			</div>
		</article>
	);
}

export default PlaceCard;

