import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import {Place} from '../../types/place';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
	city: Place;
	places: Place[];
}

const defaultCustomIcon = new Icon({
	iconUrl: URL_MARKER_DEFAULT,
	iconSize: [40, 40],
	iconAnchor: [20,40]
});

// const currentCustomIcon = new Icon({
// 	iconUrl: URL_MARKER_CURRENT,
// 	iconSize: [40, 40],
// 	iconAnchor: [20,40]
// });


function Map({city, places}: MapProps): JSX.Element {
	const mapRef = useRef(null);
	const map = useMap(mapRef, city);

	useEffect(() => {
		if(map) {
			const markerLayer = layerGroup().addTo(map);

			places.forEach((place) => {
				const marker = new Marker({
					lat: place.location.latitude,
					lng: place.location.longitude
				});

				marker
					.setIcon(defaultCustomIcon)
					.addTo(markerLayer);
			});

			return () => {
				map.removeLayer(markerLayer);
			};
		}
	}, [places, map]);

	return <div ref ={mapRef} style={{height: '500px'}}></div>;
}

export default Map;
