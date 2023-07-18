import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Setting} from './const';
import {places} from './data/places';
import {offer} from './data/offer';
import {comments} from './data/comments';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App offersCount={Setting.OffersCount} places={places} offer={offer} comments={comments}/>
	</React.StrictMode>
);
