import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.ENDPOINT_USER || "https://lexart-desafio-api.vercel.app/user",
});

export type TUser = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  username: string;
};

interface ErrorResponse {
  error: string;
}

export async function Login(user: TUser): Promise<LoginResponse | ErrorResponse> {
  try {
    const response = await api.post<LoginResponse, any>('/login', user);
    const { token } = response.data;
    Cookies.set('token', token, { expires: 7 });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    } 
    return { error: 'Unexpected error occurred' };
  }
}

export async function Register(user: TUser) {
  const response = await api.post('/register', user);
  const data = await response.data;
  return data;
}
