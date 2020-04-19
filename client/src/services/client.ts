import axios from 'axios';

const client = axios.create();

client.interceptors.response.use(
	(response: any) => response,
	(error: any) => error?.response || { data: null, status: null },
);

export default client;
