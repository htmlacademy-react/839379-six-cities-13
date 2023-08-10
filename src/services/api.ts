import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {BASE_URL, TIMEOUT} from '../const';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';

const StatusCodeMapping: Record<number, boolean> = {
	[StatusCodes.BAD_REQUEST]: true,
	[StatusCodes.UNAUTHORIZED]: true,
	[StatusCodes.NOT_FOUND]: true,
	[StatusCodes.CONFLICT]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

type DetailMessageType = {
  type: string;
  message: string;
}

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

	api.interceptors.response.use(
		(response) => response,
		(error: AxiosError<DetailMessageType>) => {
			if (error.response && shouldDisplayError(error.response)) {
				const detailMessage = (error.response.data);

				processErrorHandle(detailMessage.message);
			}
			// if(error.response?.status === StatusCodes.NOT_FOUND) {
			// 	browserHistory.push(AppRoute.NotFound);
			// }

			throw error;
		}
	);

	return api;
};
