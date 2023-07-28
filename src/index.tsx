import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {places} from './data/places';
import {offer} from './data/offer';
import {comments} from './data/comments';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App places={places} offer={offer} comments={comments}/>
		</Provider>
	</React.StrictMode>
);
