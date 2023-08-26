import PlaceCard from '../place-card/place-card';
import { Place } from '../../types/place';

type NearPlacesListProps = {
	places: Place[];
}
function NearPlacesList({places}: NearPlacesListProps): JSX.Element {

	return (
		<div className="near-places__list places__list">
			{places.map((place) => <PlaceCard blockName='near-places' key={place.id} info={place} width={260} height={200}/>)}
		</div>
	);
}

export default NearPlacesList;
