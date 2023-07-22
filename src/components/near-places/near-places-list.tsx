import NearPlace from './near-place';
import { Place } from '../../types/place';

type NearPlacesListProps = {
	places: Place[];
}
function NearPlacesList({places}: NearPlacesListProps): JSX.Element {
	return (
		<div className="near-places__list places__list">
			{places.map((place) => <NearPlace key={place.id} info={place}/>)}
		</div>
	);
}

export default NearPlacesList;
