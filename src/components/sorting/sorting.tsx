import {SortingType} from '../../const';
import cn from 'classnames';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { changeSort } from '../../store/places-data/places-data';
import { useState } from 'react';
import { getSort } from '../../store/places-data/selectors';

function Sorting(): JSX.Element {
	const sortingTypes = Object.keys(SortingType) as Array<keyof typeof SortingType>;
	const sort = useAppSelector(getSort);
	const dispatch = useAppDispatch();
	const [isActiveSort, setActiveSort] = useState(false);

	return (
		<form className="places__sorting" action="#" method="get">
			<span className="places__sorting-caption">Sort by</span>{' '}
			<span onClick={() => setActiveSort((prevState) => !prevState)} className="places__sorting-type" tabIndex={0}>
				{SortingType[sort]}
				<svg className="places__sorting-arrow" width={7} height={4}>
					<use xlinkHref="#icon-arrow-select" />
				</svg>
			</span>
			<ul className={cn(
				'places__options places__options--custom',
				{'places__options--opened': isActiveSort}
			)}
			>
				{sortingTypes.map((sortType) => (
					<li
						onClick={() => {
							dispatch(changeSort(sortType));
							setActiveSort((prevState) => !prevState);
						}}
						key={sortType}
						className={cn(
							'places__option',
							{'places__option--active': sortType === sort}
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
