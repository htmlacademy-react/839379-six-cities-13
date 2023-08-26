import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import {Place} from '../../types/place';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';

type MapProps = {
	activePlace?: Place | Offer;
	places: Array<Place | Offer>;
}

const defaultCustomIcon = new Icon({
	iconUrl: '/img/pin.svg',
	iconSize: [27, 39],
	iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
	iconUrl: '/img/pin-active.svg',
	iconSize: [27, 39],
	iconAnchor: [13.5, 39]
});


function Map({activePlace, places}: MapProps): JSX.Element {

	const location = places[0].city.location;

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

			places.forEach((place) => {
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
	}, [places, map, activePlace]);

	return <div ref ={mapRef} style={{height: '100%'}}></div>;
}

export default Map;
