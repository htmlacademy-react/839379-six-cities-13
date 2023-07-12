import {AuthorizationStatus, AppRoute} from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
	authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
	children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
	const {authorizationStatus, children} = props;

	return (
		authorizationStatus === AuthorizationStatus.Auth
			? children
			: <Navigate to={AppRoute.Login}/>
	);
}

export default PrivateRoute;
