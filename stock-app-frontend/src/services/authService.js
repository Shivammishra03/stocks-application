import api from './apiService';

import {decodeJwt} from '../utils/jwtDecode'
import { useRouter } from 'vue-router';



export const login = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password });
  localStorage.setItem('token', data.token);
  return decodeJwt(data.token);
};

export const logout = () => {
  localStorage.removeItem('token');
  const router = useRouter();
  router.push('/login');
};
