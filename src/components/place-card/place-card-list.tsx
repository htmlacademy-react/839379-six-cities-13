import {Place} from '../../types/place';
import PlaceCard from './place-card';
import { useState } from 'react';

type PlaceCardListProps = {
	places: Place[];
}

function PlaceCardList({places}: PlaceCardListProps): JSX.Element {
	const [activeCard, setActiveCard] = useState({
		id: '',
		title: '',
		type: '',
		price: 0,
		previewImage: '',
		city: {
			name: '',
			location: {
				latitude: 0,
				longitude: 0,
				zoom: 0,
			}
		},
		location: {
			latitude: 0,
			longitude: 0,
			zoom: 0,
		},
		isFavorite: false,
		isPremium: false,
		rating: 0,
	});


	function handleMouseOver(info:Place) {
		setActiveCard({...activeCard, ...info});
	}

	return (
		<div className="cities__places-list places__list tabs__content">
			{places.map((place) => <PlaceCard key={place.id} info={place} onPlace={handleMouseOver}/>)}
		</div>
	);
}

export default PlaceCardList;
