'use client';

import { Logout, getSession } from '@/Services/User';
import useUserStore from '@/context/useUserStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const AppBar = () => {
  const router = useRouter();
  const setUser = useUserStore((state: any) => state.setUser);
  const username = useUserStore((state: any) => state.user);

  const getUserSession = useCallback(async () => {
    const user = await getSession();
    return user;
  }, []);

  useEffect(() => {
    const fetchUserSession = async () => {
      const user = await getUserSession();
      if (user.username) {
        return setUser(user.username);
      }
      setUser(null);
    };
  
    fetchUserSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    Logout();
    setUser(null);
    router.push('/auth/signin');
  };
  
  return (
    <header className='bg-gray-800 p-2 w-full h-[4.525rem] max-h-[4.525rem] justify-between shadow-md truncate pr-4 pt-4'>
      <div className='flex text-sm justify-between'>
        {!username ? (
          <div className='flex self-end'>
            <button
              onClick={() => router.push('/auth/signin')}
              className='border-[1px] border-blue-50 rounded-md bg-blue-500 font-semibold px-3 py-2 text-base text-blue-50
              hover:bg-blue-50 hover:border-blue-600 hover:text-blue-500 transition-all duration-300 ease-in-out'
            >
              Entrar
            </button>
          </div>
        ) : (
          <>
            <div className='flex self-start gap-4'>
            <button
              onClick={() => router.push('/product/new')}
              className='border-[1px] border-blue-50 rounded-md bg-blue-500 font-semibold px-3 py-2 text-base text-blue-50
                hover:bg-blue-50 hover:border-blue-600 hover:text-blue-500 transition-all duration-300 ease-in-out'
            >
              Cadastrar
            </button>
            <button
              onClick={() => router.push('/')}
              className='border-[1px] border-blue-50 rounded-md bg-blue-500 font-semibold px-3 py-2 text-base text-blue-50
                hover:bg-blue-50 hover:border-blue-600 hover:text-blue-500 transition-all duration-300 ease-in-out'
            >
              Principal
            </button>
            </div>
            <div className='flex items-baseline self-end'>
              <p className='text-md text-center truncate text-gray-50 font-semibold mr-4'>
                Bem vindo, {username}
              </p>
              <button
                onClick={() => signOut()}
                className={`
              border-[1px] border-red-800 rounded-md bg-red-500 font-semibold px-3 py-2 text-base text-gray-50
              hover:bg-red-800 hover:border-red-500 hover:text-gray-50 transition-all duration-300 ease-in-out
              `}
              >
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default AppBar;
