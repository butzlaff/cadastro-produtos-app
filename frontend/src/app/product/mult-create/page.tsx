'use client';
import { CreateProduct } from '@/Services/Product';
import { nanoid } from 'nanoid';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface MultProducts {
  name: string;
  brand: string;
  model: string;
  data: {
    price: number;
    color: string;
  }[];
}

type FormColor = {
  color: string;
  price: number;
};

const ProductForm = () => {
  const [products, setProducts] = useState<MultProducts[]>([]);
  const [lockInputs, setLockInputs] = useState(false);
  const [productPrice, setProductPrice] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productColors, setProductColors] = useState<FormColor[]>([]);

  const { reset, register, watch } = useForm<CreateProduct>();

  const addColor = () => {
    const { price, color } = watch();
    const data = {
      color: color,
      price: Number(price),
    };
    setProductColors((productColors) => [...productColors, data]);
    setLockInputs(true);
  };
  const addProduct = () => {
    const { name, brand, model } = watch();
    const newProduct = {
      name: name,
      brand: brand,
      model: model,
      data: productColors.map(item => item),
    };
    setProducts((state) => [...state, newProduct]);
    setLockInputs(false);
    setProductColors([]);
  }
  const addNewProductColor = () => {
    if (productColor && productPrice) {
      const newColor = { color: productColor, price: parseFloat(productPrice) };
      setProductColors((state) => [...state, newColor]);
      setProductColor('');
      setProductPrice('');
    }
  };

  const sendProducts = () => {
    console.log(products);
    setProducts([]);
    setProductColors([]);
    reset({
      brand: '',
      name: '',
      model: '',
      color: '',
      price: 0,
    });
  };

  return (
    <main className='flex items-center justify-center p-4'>
      <div className='flex flex-col gap-4 w-full text-white'>
        <h2 className='text-2xl text-center font-bold'>Cadastro de Celular</h2>
        <div className='flex justify-center'>
          <form
            className='flex flex-col w-[50%]'
          >
            <div className='relative pb-4 flex flex-col'>
              <label htmlFor='name'>Nome: </label>
              <input
                type='text'
                id='name'
                placeholder='Nome do produto'
                className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
                disabled={lockInputs}
                {...register('name', { required: true })}
              />
            </div>

            <div className='relative pb-4 flex flex-col'>
              <label htmlFor='model'>Modelo</label>
              <input
                type='text'
                id='model'
                placeholder='Modelo do produto'
                className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
                {...register('model', { required: true })}
                disabled={lockInputs}
              />
            </div>

            <div className='relative pb-4 flex flex-col'>
              <label htmlFor='brand'>Marca</label>
              <input
                type='text'
                id='brand'
                placeholder='Marca do produto'
                className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
                {...register('brand', { required: true })}
                disabled={lockInputs}
              />
            </div>

            <div className='relative pb-4 flex flex-col'>
              <label htmlFor='color'>Cor</label>
              <input
                type='text'
                id='color'
                placeholder='Cor do produto'
                className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
                {...register('color', { required: true })}
                disabled={lockInputs}
              />
            </div>

            <div className='relative pb-4 flex flex-col'>
              <label htmlFor='price'>Preço</label>
              <input
                type='number'
                min={0}
                id='price'
                placeholder='Preço do produto'
                className='border border-gray-300 rounded-md px-4 py-2 w-64 text-black'
                {...register('price', { required: true })}
                disabled={lockInputs}
              />
            </div>

            <div className='flex justify-center gap-2 w-full mt-4'>
              <button
                onClick={() => addColor()}
                type='button'
                className='bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors duration-300 w-24'
              >
                Salvar
              </button>
              <button
                onClick={ addProduct }
                type='button'
                className='bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-24'
              >
                Novo Produto
              </button>

              <button
                type='button'
                value='Cancelar'
                className='bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-24'
                onClick={() => {
                  setProductColor('');
                  setProductPrice('');
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
          <div className='flex flex-col w-[50%]'>
            <ul>
              {productColors.map((item) => (
                <li key={nanoid()}>
                  Color: {item.color} - Price: ${item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div>
          <h2>Cores</h2>
          <input
            type='text'
            disabled={!lockInputs}
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
            placeholder='Color'
            className='border border-gray-300 rounded-md px-4 py-2 w-40 text-black'
          />
          <input
            type='text'
            disabled={!lockInputs}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder='Price'
            className='border border-gray-300 rounded-md px-4 py-2 w-48 text-black'
          />
          <button
            type='button'
            disabled={!productColor || !productPrice}
            onClick={addNewProductColor}
            className='bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-48 disabled:bg-gray-600'
          >
            Adicionar cor
          </button>
        </div>
        <button
          onClick={ sendProducts }
          type='button'
          className='bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors duration-300 w-full mt-4'
        >
          Cadastrar produtos
        </button>
      </div>
    </main>
  );
};

export default ProductForm;
