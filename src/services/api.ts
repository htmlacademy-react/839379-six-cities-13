import axios, {AxiosInstance} from 'axios';
import { BASE_URL, TIMEOUT} from '../const';

export const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BASE_URL,
		timeout: TIMEOUT
	});

	return api;
};
