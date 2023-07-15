import {Place} from '../../types/place';
import PlaceCard from './place-card';

type PlaceCardListProps = {
	places: Place[];
	onPlace: (info:string) => void;
}

function PlaceCardList({places, onPlace}: PlaceCardListProps): JSX.Element {
	return (
		<div className="cities__places-list places__list tabs__content">
			{places.map((place) => <PlaceCard key={place.id} info={place} onPlace={onPlace}/>)}
		</div>
	);
}

export default PlaceCardList;
