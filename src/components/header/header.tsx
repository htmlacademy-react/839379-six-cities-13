import { Link, useLocation } from 'react-router-dom';
import className from 'classnames';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import NavForAuthorized from '../nav-for-authorized/nav-for-authorized';
import NavForUnauthorized from '../nav-for-unauthorized/nav-for-unauthorized';
import { getAuthorizationStatus } from '../../store/user-data/selectors';

function Header(): JSX.Element {
	const {pathname} = useLocation();
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link
							className={className(
								'header__logo-link',
								{'header__logo-link--active': pathname === AppRoute.Main}
							)}
							to={AppRoute.Main}
						>
							<img
								className="header__logo"
								src="img/logo.svg"
								alt="6 cities logo"
								width={81}
								height={41}
							/>
						</Link>
					</div>
					<nav className="header__nav">
						<ul className="header__nav-list">
							{authorizationStatus === AuthorizationStatus.Auth ? <NavForAuthorized/> : <NavForUnauthorized/>}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
