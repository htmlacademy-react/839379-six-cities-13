// import { useState } from 'react';
import {cities} from '../../const';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeCity } from '../../store/action';

function CityList():JSX.Element {

	const dispatch = useAppDispatch();
	const currentCity = useAppSelector((state) => state.city);

	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{cities.map((city) => (
						<li key={city} className="locations__item">
							<Link
								onClick={() => dispatch(changeCity(city))}
								className={cn(
									'locations__item-link tabs__item',
									{'tabs__item--active': city === currentCity}
								)}
								to={`#${city.toLocaleLowerCase()}`}
							>
								<span>{city}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default CityList;
