'use client';

import { getProduct, updateProduct } from '@/Services/Product';
import { IProduct } from '@/components/ProductList';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useQuery(
    ['get_product'],
    async () => {
      const product = await getProduct(Number(id));
      return product;
    },
    {
      enabled: !!id,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: {
      name: product?.name || '',
      model: product?.model || '',
      brand: product?.brand || '',
      color: product?.color || '',
      price: product?.price || 0.0,
    },
    values: product,
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      await updateProduct(data);
      await Swal.fire('Editado com sucesso');
    } catch (e) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Aconteceu algum erro...',
        timer: 2000,
      });
    }
    router.push('/');
  };

  return (
    <main className='flex items-center justify-center p-4'>
      <div className='flex flex-col gap-4 w-full text-white'>
        <h2 className='text-2xl text-center font-bold'>Edição de celular</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='name'>Nome: </label>
            <input
              type='text'
              id='name'
              placeholder='Nome do produto'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='model'>Modelo</label>
            <input
              type='text'
              id='model'
              placeholder='Modelo do produto'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('model', { required: true })}
            />
            {errors.model && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='brand'>Marca</label>
            <input
              type='text'
              id='brand'
              placeholder='Marca do produto'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('brand', { required: true })}
            />
            {errors.brand && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='color'>Cor</label>
            <input
              type='text'
              id='color'
              placeholder='Cor do produto'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('color', { required: true })}
            />
            {errors.color && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='relative pb-4 flex flex-col'>
            <label htmlFor='price'>Preço</label>
            <input
              min={0}
              id='price'
              placeholder='Preço do produto'
              className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
              {...register('price', {
                required: true,
                valueAsNumber: true,
                validate: (value) => value > 0,
              })}
            />
            {errors.price && (
              <span className='error-message'>Campo obrigatório</span>
            )}
          </div>

          <div className='flex justify-center gap-4 w-full mt-4'>
            <input
              type='submit'
              value='Atualizar'
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
