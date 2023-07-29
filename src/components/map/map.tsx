import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import {Place} from '../../types/place';
import useMap from '../../hooks/useMap';
import { useAppSelector } from '../../hooks';

type MapProps = {
	activePlace?: Place | undefined;
}

const defaultCustomIcon = new Icon({
	iconUrl: '../../../markup/img/pin.svg',
	iconSize: [28, 40],
	iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
	iconUrl: '../../../markup/img/pin-active.svg',
	iconSize: [28, 40],
	iconAnchor: [14, 40]
});


function Map({activePlace}: MapProps): JSX.Element {
	const currentOffers = useAppSelector((state) => state.places);
	const location = currentOffers[0].city.location;

	const mapRef = useRef(null);
	const map = useMap(mapRef, location);

	useEffect(() => {
		if(map) {
			map.setView([location.latitude, location.longitude], location.zoom);
		}
	}, [map, location]);

	useEffect(() => {
		if(map) {
			const markerLayer = layerGroup().addTo(map);

			currentOffers.forEach((place) => {
				const marker = new Marker({
					lat: place.location.latitude,
					lng: place.location.longitude
				});

				marker
					.setIcon(
						place.id === activePlace?.id ? currentCustomIcon : defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				map.removeLayer(markerLayer);
			};
		}
	}, [currentOffers, map, activePlace]);

	return <div ref ={mapRef} style={{height: '100%'}}></div>;
}

export default Map;
