import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import styles from './not-found.module.css';

function NotFoundPage(): JSX.Element {
	return (
		<div className={styles.block}>
			<Helmet><title>6 cities. Not found</title></Helmet>
			<h1 className={styles.message}>404 Not Found</h1>
			<Link className={styles.link} to='/'>Go back to main page</Link>
		</div>
	);
}

export default NotFoundPage;
