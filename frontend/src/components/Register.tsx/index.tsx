'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const { username, email, password } = data;

    const validateConfirmPassword = data.password === data.confirmPassword;

    if (!validateConfirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senha e confirmação de senha devem ser iguais.',
      });
    }

    try {
      // await api.post(`/api/register`, {
      //   name: fullName,
      //   email,
      //   phone,
      //   country,
      //   state,
      //   city,
      //   password,
      //   isAdmin: false,
      //   verified: true
      // });
      await Swal.fire('Cadastrado com sucesso');
    } catch (e) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário já cadastrado.',
        footer: '<a href="/auth/signin">Faça seu login!</a>',
      });
    }
    router.push('/');
  };

  return (
    <main className='flex items-center justify-center p-4'>
      <div className='flex flex-col gap-4 w-full text-white'>
        <h2 className='text-2xl text-center font-bold'>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='fullName'>Usuário</label>
            <input
              type='text'
              id='fullName'
              placeholder='Usuário'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('username', { required: true })}
            />
            {errors.username && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='password'>Senha</label>
            <input
              type='password'
              id='password'
              placeholder='Senha'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='confirmPassword'>Confirmar Senha</label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Confirme sua Senha'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('confirmPassword', { required: true })}
            />
            {errors.confirmPassword && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='flex justify-center gap-4 w-full mt-4'>
            <input
              type='submit'
              value='Cadastrar'
              className='bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-24'
            />

            <input
              type='button'
              value='Cancelar'
              className='bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-24'
              onClick={() => router.back()}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
