import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteFavorite } from '../../store/api-actions';
import { useState } from 'react';
import { getFavoriteAddingStatus, getFavoriteDeletingStatus } from '../../store/favorites-data/selectors';

type BookmarkButtonSize = 'small' | 'large';

type BookmarkProps = {
	id: string;
	isFavorite: boolean;
	block: string;
	size: BookmarkButtonSize;
}

const sizeMap: Record<BookmarkButtonSize, {width: string; height: string}> = {
	small: {width: '18', height: '19'},
	large: {width: '31', height: '33'}
};

const BookmarkButton = ({id, isFavorite, block, size}: BookmarkProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const favoriteAddingStatus = useAppSelector(getFavoriteAddingStatus);
	const favoriteDeletingStatus = useAppSelector(getFavoriteDeletingStatus);
	const [isActive, setActive] = useState(isFavorite);

	const handleButtonClick = () => {
		if(authorizationStatus !== AuthorizationStatus.Auth) {
			navigate(AppRoute.Login);
			return;
		}

		dispatch(isActive ? deleteFavorite(id) : addFavorite(id));
		setActive((previous) => !previous);
	};

	return (
		<button
			onClick={handleButtonClick}
			className={cn(
				`${block}__bookmark-button`, 'button',
				{[`${block}__bookmark-button--active`]: isActive}
			)}
			type="button"
			disabled={favoriteAddingStatus === RequestStatus.PENDING || favoriteDeletingStatus === RequestStatus.PENDING }
		>
			<svg
				className={`${block}__bookmark-icon`} {...sizeMap[size]}
			>
				<use xlinkHref="#icon-bookmark" />
			</svg>
			<span className="visually-hidden">{isActive ? 'In' : 'To'} bookmarks</span>
		</button>
	);
};

export default BookmarkButton;
