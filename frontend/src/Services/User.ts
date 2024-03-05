"use server";

import { cookies } from 'next/headers';

export type TUser = {
  username: string;
  password: string;
}

export async function GetCookies() {
  const cookie = cookies();
  const getCookie = cookie.get('token');
  console.log(getCookie);
}

export async function SetCookie(jwt: string) {
  const cookie = cookies();
  const setCookie = cookie.set('token', jwt, { maxAge: 60 * 60 * 24 });
  console.log(setCookie);
}

export async function Login(user: TUser) : Promise<string | null> {
  const response = await fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });

  if (response.status === 200) {
    const data = await response.json();
    SetCookie(data);
    return data;
  };
  return null;
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