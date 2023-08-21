import cn from 'classnames';
import { Place } from '../../types/place';

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
			<a className="footer__logo-link" href="main.html">
				<img
					className="footer__logo"
					src="img/logo.svg"
					alt="6 cities logo"
					width={64}
					height={33}
				/>
			</a>
		</footer>
	);
}

export default Footer;
