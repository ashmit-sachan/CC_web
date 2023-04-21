import axios from 'axios';

const API_URL = 'https://k62dm8tall.execute-api.us-east-1.amazonaws.com/prod/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;