import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
	return (
		<div style={{textAlign: 'center', marginTop: '150px'}}>
			<Helmet><title>6 cities. Not found</title></Helmet>
			<h1 style={{fontFamily: 'rubik, arial,sans-serif', fontStyle: 'oblique', color: '#4481c3', fontSize: '48px', fontWeight: 'bold'}}>404 Not Found</h1>
			<Link to='/'>Вернуться на главную страницу</Link>
		</div>
	);
}

export default NotFoundPage;
