import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store/api-actions';
import { getFavorites } from '../../store/favorites-data/selectors';
import { getUserInfo } from '../../store/user-data/selectors';

function NavForAuthorized(): JSX.Element | undefined {
	const dispatch = useAppDispatch();
	const favorites = useAppSelector(getFavorites);
	const userInfo = useAppSelector(getUserInfo);

	const handleLogOutClick = () => {
		dispatch(logOut());
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
						{userInfo.email}
					</span>
					<span className="header__favorite-count">{favorites.length}</span>
				</Link>
			</li>
			<li className="header__nav-item">
				<Link onClick={handleLogOutClick} className="header__nav-link" to='#'>
					<span className="header__signout">Sign out</span>
				</Link>
			</li>
		</Fragment>
	);
}

export default NavForAuthorized;
