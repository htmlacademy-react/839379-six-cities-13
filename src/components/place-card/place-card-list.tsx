import { useAppSelector } from '../../hooks';
import PlaceCard from './place-card';

type PlaceCardListProps = {
	onPlace: (id:string) => void;
	outPlace: () => void;
}

function PlaceCardList({onPlace, outPlace}: PlaceCardListProps): JSX.Element {
	const places = useAppSelector((state) => state.currentPlaces);

	return (
		<div className="cities__places-list places__list tabs__content">
			{places.map((place) => <PlaceCard className='cities' key={place.id} info={place} onPlace={onPlace} outPlace={outPlace}/>)}
		</div>
	);
}

export default PlaceCardList;
