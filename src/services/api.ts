import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.250:3334'
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde'))
  }
})


export {api};