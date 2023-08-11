import { useState, useRef, useEffect, MutableRefObject } from 'react';
import {Map as LeafletMap, TileLayer} from 'leaflet';
import {PointLocation} from '../types/place';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: PointLocation): LeafletMap | null {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const isRendered = useRef<boolean>(false);

	useEffect(() => {
		if(mapRef.current !== null && ! isRendered.current) {
			const instance = new LeafletMap(mapRef.current, {
				center : {
					lat: location.latitude,
					lng: location.longitude
				},
				zoom: location.zoom
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
	},[mapRef, location]);

	return map;
}

export default useMap;
