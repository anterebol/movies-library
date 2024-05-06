import axios from 'axios';

const instance = axios.create({
	baseURL: '',
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = 'Bearer ' +  process.env.NEXT_PUBLIC_BEARER_TOKEN;
  config.headers.Accept = 'application/json';
	return config;
});

export default instance;
