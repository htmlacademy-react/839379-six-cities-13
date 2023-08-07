import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { requireAuthorization } from '../../store/action';
import { dropToken } from '../../services/token';

function NavForAuthorized(): JSX.Element {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		dropToken();
	};

	return (
		<Fragment>
			<li className="header__nav-item user">
				<Link
					className="header__nav-link header__nav-link--profile"
					to={AppRoute.Favorites}
				>
					<div className="header__avatar-wrapper user__avatar-wrapper"></div>
					<span className="header__user-name user__name">
						Oliver.conner@gmail.com
					</span>
					<span className="header__favorite-count">3</span>
				</Link>
			</li>
			<li className="header__nav-item">
				<Link onClick={handleClick} className="header__nav-link" to={AppRoute.Login}>
					<span className="header__signout">Sign out</span>
				</Link>
			</li>
		</Fragment>
	);
}

export default NavForAuthorized;
