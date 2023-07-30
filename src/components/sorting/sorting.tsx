import {SortingType} from '../../const';
import cn from 'classnames';

function Sorting(): JSX.Element {
	const sortingTypes = Object.keys(SortingType) as Array<keyof typeof SortingType>;
	return (
		<form className="places__sorting" action="#" method="get">
			<span className="places__sorting-caption">Sort by</span>{' '}
			<span className="places__sorting-type" tabIndex={0}>
				Popular
				<svg className="places__sorting-arrow" width={7} height={4}>
					<use xlinkHref="#icon-arrow-select" />
				</svg>
			</span>
			<ul className="places__options places__options--custom places__options--opened">
				{sortingTypes.map((sortType) => (
					<li
						key={sortType}
						className={cn(
							'places__option',
							{'places__option--active': false}
						)}
						tabIndex={0}
					>
						{SortingType[sortType]}
					</li>
				))}
			</ul>
		</form>
	);
}

export default Sorting;
