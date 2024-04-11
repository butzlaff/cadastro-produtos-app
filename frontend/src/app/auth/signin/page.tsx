'use client';

import { getSession } from '@/Services/User';
import LoginForm from '@/components/Login';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Sign = () => {
  const router = useRouter();
  const getUser = useCallback(async () => {
    const user = await getSession();
    if (!user.username === null) {
      router.push('/');
    }
  }, []);
  

  return <LoginForm />;
};

export default Sign;
