import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteFavorite } from '../../store/api-actions';

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

	const handleClick = () => {
		if(authorizationStatus !== AuthorizationStatus.Auth) {
			navigate(AppRoute.Login);
			return;
		}
		if(!isFavorite) {
			dispatch(addFavorite(id));

		} else{
			dispatch(deleteFavorite(id));
		}
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				`${block}__bookmark-button`, 'button',
				{[`${block}__bookmark-button--active`]: isFavorite}
			)}
			type="button"
		>
			<svg
				className={`${block}__bookmark-icon`} {...sizeMap[size]}
			>
				<use xlinkHref="#icon-bookmark" />
			</svg>
			<span className="visually-hidden">To bookmarks</span>
		</button>
	);
};

export default BookmarkButton;
