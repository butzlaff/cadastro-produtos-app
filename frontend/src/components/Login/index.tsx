'use client';
import { Login, TUser } from '@/Services/User';
import useUserStore from '@/context/useUserStore';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const router = useRouter();
  const redirecToRegister: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    router.push('/register');
  };

  const { handleSubmit, register } = useForm<TUser>();
  const setUser = useUserStore((state: any) => state.setUser);
  
  const handleLogin: SubmitHandler<TUser> = async (data) => {
    const user = await Login(data);
    if ('username' in user) {
      setUser(user.username)
      router.push('/');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login efetuado com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu algum erro!',
        timer: 3000,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className='flex flex-col items-center justify-center text-white'>
        <label className='mb-2'>
          <span className='block mb-1'>Usuário</span>
          <input
            type='text'
            className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
            { ...register("username", { required: true }) }
            autoComplete="false"
          />
        </label>
        <label className='mb-2'>
          <span className='block mb-1'>Password</span>
          <input
            type='password'
            className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
            { ...register("password", { required: true }) }
          />
        </label>
        <div className='flex'>
          <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 w-24'>
            Login
          </button>
          <button
            type='button'
            onClick={(e) => redirecToRegister(e)}
            className='bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 w-24'
          >
            Registro
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
