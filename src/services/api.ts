import axios, { AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../types/error';
import { toast } from 'react-toastify';

const BASE_URL = 'https://13.design.pages.academy/six-cities';
const TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
	[StatusCodes.BAD_REQUEST]: true,
	[StatusCodes.UNAUTHORIZED]: true,
	[StatusCodes.NOT_FOUND]: true,
	[StatusCodes.CONFLICT]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const createAPI = (): AxiosInstance => {
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
		(error: AxiosError<ErrorMessage>) => {
			if (error.response && shouldDisplayError(error.response)) {
				const detailMessage = (error.response.data);

				toast.warn(detailMessage.message);
			}

			throw error;
		}
	);

	return api;
};

export {createAPI};
