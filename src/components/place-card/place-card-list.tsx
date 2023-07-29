import { useAppSelector } from '../../hooks';
import PlaceCard from './place-card';

type PlaceCardListProps = {
	onPlace: (info:string) => void;
	outPlace: () => void;
}

function PlaceCardList({onPlace, outPlace}: PlaceCardListProps): JSX.Element {
	const currentOffers = useAppSelector((state) => state.places);

	return (
		<div className="cities__places-list places__list tabs__content">
			{currentOffers.map((place) => <PlaceCard className='cities' key={place.id} info={place} onPlace={onPlace} outPlace={outPlace}/>)}
		</div>
	);
}

export default PlaceCardList;
