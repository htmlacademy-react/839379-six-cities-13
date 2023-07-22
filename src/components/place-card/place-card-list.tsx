import {Place} from '../../types/place';
import PlaceCard from './place-card';

type PlaceCardListProps = {
	places: Place[];
	onPlace: (info:string) => void;
	outPlace: () => void;
}

function PlaceCardList({places, onPlace, outPlace}: PlaceCardListProps): JSX.Element {
	return (
		<div className="cities__places-list places__list tabs__content">
			{places.map((place) => <PlaceCard className='cities' key={place.id} info={place} onPlace={onPlace} outPlace={outPlace}/>)}
		</div>
	);
}

export default PlaceCardList;
