"use server";

import { cookies } from 'next/headers';

type TUser = {
  username: string;
  password: string;
}

export async function GetCookies() {
  const cookie = cookies();
  const getCookie = cookie.get('token');
  console.log(getCookie);
}

export async function Login(user: TUser) {
  const response = await fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });

  const data = await response.json();
  GetCookies();
  return data;
}

export async function Register(user: TUser) {
  const response = await fetch('http://localhost:3001/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
}