'use server';

import axios, { AxiosError } from 'axios';
// import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

const api = axios.create({
  baseURL: process.env.ENDPOINT_USER || 'http://localhost:3001/user',
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

export async function Login(
  user: TUser
): Promise<LoginResponse | ErrorResponse> {
  try {
    const response = await api.post<LoginResponse, any>('/login', user);
    console.log(response.data);
    const { token } = response.data;
    cookies().set('token', token);
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

export async function getSession() {
  const cookie = cookies().get('token');
  if (!cookie) return { username: null };
  const response = await api.get<{ username: string; email: string }>('/', {
    headers: {
      Authorization: `Bearer ${cookie?.value}` || undefined,
    },
  });
  const data = response.data;
  return data;
}

export async function Logout() {
  const cookie = cookies();
  cookie.delete('token');
}
