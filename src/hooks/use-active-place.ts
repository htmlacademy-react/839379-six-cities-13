import { useState } from 'react';
import { Place } from '../types/place';

type ResultActivePlace = [Place | undefined, (id: string) => void, () => void]

const useActivePlace = (places: Place[]): ResultActivePlace => {
	const [activePlace, setActivePlace] = useState<Place | undefined>(undefined);

	const handleMouseOver = (id: string) => {
		const currentPlace = places.find((place) => place.id === id);
		setActivePlace(currentPlace);
	};

	const handleMouseOut = () => setActivePlace(undefined);


	return [activePlace, handleMouseOver, handleMouseOut];
};

export default useActivePlace;
