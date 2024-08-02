import axios, { AxiosInstance } from 'axios';

const ClienteAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5004', // Cambia esta URL según la URL de tu servidor
    headers: {
        'Content-Type': 'application/json',
    },
});

export default ClienteAxios;
