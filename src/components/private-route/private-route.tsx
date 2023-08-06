import {AuthorizationStatus, AppRoute} from '../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
	children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
	const AuthStatus = useAppSelector((state) => state.authorizationStatus);

	return (
		AuthStatus === AuthorizationStatus.Auth
			? children
			: <Navigate to={AppRoute.Login}/>
	);
}

export default PrivateRoute;
