import axios from 'axios';
import {storeDispatch} from '@/store';
import {setToken} from '@/store/slices/userSlice';

export const rabbitAxiosConfig = {
	baseURL: '/api/',
	timeout: 300000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};
const lugatAxios = axios.create(rabbitAxiosConfig);

export const setHeadersBearerCustomAxios = (token: string) => {
	lugatAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const errorHandler = (error: any): any => {
	if (error?.response?.status === 401 && localStorage.getItem('token')) {
		// originalConfig._retry = true;
		// if (isUserRefetching) return;
		// storeDispatch(setUserIsFetching(true));
		// refreshToken(localStorage.getItem('token'));
	} else {
		if (error?.response?.status === 401) {
			storeDispatch(setToken(null));
			// window.location.href = '/login';
		}
		return Promise.reject(error);
	}
};

lugatAxios.interceptors.request.use(
	(request) => request,
	(error) => error
);

lugatAxios.interceptors.request.use(
	(request: any) => {
		if (localStorage.getItem('token')) {
			request.headers = {
				Accept: 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			};
		}
		return request;
	},
	(error) => Promise.reject(error)
);

lugatAxios.interceptors.response.use(
	(response) => response,
	(error) => errorHandler(error)
);

export default lugatAxios;
