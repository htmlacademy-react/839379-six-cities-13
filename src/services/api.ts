import axios, {AxiosInstance} from 'axios';
import { BASE_URL, TIMEOUT} from '../const';
import { getToken } from './token';

export const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BASE_URL,
		timeout: TIMEOUT
	});

	api.interceptors.request.use((config) => {
		const token = getToken();
		if(token && config.headers) {
			config.headers['X-Token'] = token;
		}

		return config;
	});

	return api;
};
