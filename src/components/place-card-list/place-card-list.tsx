import { useAppSelector } from '../../hooks';
import { getCurrentPlaces } from '../../store/places-data/selectors';
import PlaceCard from '../place-card/place-card';

type PlaceCardListProps = {
	onPlace: (id:string) => void;
	outPlace: () => void;
}

function PlaceCardList({onPlace, outPlace}: PlaceCardListProps): JSX.Element {
	const places = useAppSelector(getCurrentPlaces);

	return (
		<div className="cities__places-list places__list tabs__content">
			{places.map((place) => <PlaceCard blockName='cities' key={place.id} info={place} width={260} height={200} onPlace={onPlace} outPlace={outPlace}/>)}
		</div>
	);
}

export default PlaceCardList;
