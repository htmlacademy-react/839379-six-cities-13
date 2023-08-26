import {AuthorizationStatus, AppRoute, RequestStatus} from '../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getCheckAuthStatus } from '../../store/user-data/selectors';

type PrivateRouteProps = {
	children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element | undefined {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const checkAuthStatus = useAppSelector(getCheckAuthStatus);
	if(checkAuthStatus === RequestStatus.Success || checkAuthStatus === RequestStatus.Error) {
		return (
			authorizationStatus === AuthorizationStatus.Auth
				? children
				: <Navigate to={AppRoute.Login}/>
		);
	}
}

export default PrivateRoute;
