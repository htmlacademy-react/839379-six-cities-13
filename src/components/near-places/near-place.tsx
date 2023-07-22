import PlaceCard from '../place-card/place-card';
import { Place } from '../../types/place';

type NearPlaceProps = {
	info: Place;
}

function NearPlace(props: NearPlaceProps): JSX.Element {
	return (
		<PlaceCard className='near-places' {...props} />
	);
}

export default NearPlace;
