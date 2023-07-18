import { useState, useRef, useEffect, MutableRefObject } from 'react';
import {Map, TileLayer} from 'leaflet';
import { Place } from '../types/place';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: Place): Map | null {
	const [map, setMap] = useState<Map | null>(null);
	const isRendered = useRef<boolean>(false);

	useEffect(() => {
		if(mapRef.current !== null && ! isRendered.current) {
			const instance = new Map(mapRef.current, {
				center : {
					lat: city.city.location.latitude,
					lng: city.city.location.longitude
				},
				zoom: city.city.location.zoom
			});
			const layer = new TileLayer(
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
				{
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
				}
			);
			instance.addLayer(layer);
			setMap(instance);
			isRendered.current = true;
		}
	},[mapRef, city]);

	return map;
}

export default useMap;
