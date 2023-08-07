import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {comments} from './data/comments';
import {Provider} from 'react-redux';
import {store} from './store';
import { fetchOffers, checkAuthStatus } from './store/api-actions';

store.dispatch(fetchOffers());
store.dispatch(checkAuthStatus());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App comments={comments}/>
		</Provider>
	</React.StrictMode>
);
