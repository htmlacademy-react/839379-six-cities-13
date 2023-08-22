import cn from 'classnames';
import { Place } from '../../types/place';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FooterProps = {
	favorites: Place[];
}

function Footer({favorites}: FooterProps):JSX.Element {
	return (
		<footer className={cn(
			'footer',
			{'container': favorites.length !== 0}
		)}
		>
			<Link className="footer__logo-link" to={AppRoute.Main}>
				<img
					className="footer__logo"
					src="img/logo.svg"
					alt="6 cities logo"
					width={64}
					height={33}
				/>
			</Link>
		</footer>
	);
}

export default Footer;
