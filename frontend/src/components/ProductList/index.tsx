import { deleteProduct } from '@/Services/Product';
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import ProductCard from '../ProductCard';
type Props = {
  data: IProduct[];
};

export type IProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  color: string;
  model: string;
};

const TableProduct = ({ data }: Props) => {
  const router = useRouter();

  const [searched, setSearched] = useState<string>('');

  const [filter, setFilter] = useState<keyof Omit<IProduct, 'id'>>('name');

  const [filterPrice, setFilterPrice] = useState<'greater' | 'less' | 'equal'>(
    'equal'
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(data);

  const queryClient = useQueryClient();

  useMemo(() => {
    setFilteredProducts(data);
  }, [data]);

  const filterProducts = () => {
    let filteredProd: IProduct[] = [];
    if (searched.trim() === '') {
      setFilteredProducts(data);
      return;
    }
    if (filter === 'price') {
      switch (filterPrice) {
        case 'greater':
          filteredProd = data.filter(
            (product) => product.price > parseFloat(searched)
          );
          break;
        case 'less':
          filteredProd = data.filter(
            (product) => product.price < parseFloat(searched)
          );
          break;
        case 'equal':
          filteredProd = data.filter(
            (product) => product.price == parseFloat(searched)
          );
          break;
        default:
          filteredProd = data;
          break;
      }
    } else {
      filteredProd = data.filter((product) =>
        product[filter]
          .toLowerCase()
          .trim()
          .includes(searched.toLowerCase().trim())
      );
    }

    setFilteredProducts(filteredProd);
  };

  const { mutate: handleDelete } = useMutation({
    mutationFn: async (id: number) => {
      await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get_products']);
      Swal.fire('Deletado com Suceso!');
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado!',
      });
    },
  });
  return (
    <>
      <div className='flex justify-between'>
        <label className='mb-2 text-white'>
          <span className='block mb-1'>Pesquisar</span>
          <input
            type='text'
            className='border border-gray-300 rounded-md px-4 py-2 text-black'
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
          <button
            onClick={filterProducts}
            type='button'
            className='border border-gray-300 rounded-md px-4 py-2 text-white bg-slate-800 hover:bg-slate-600'
          >
            Pesquisar
          </button>
        </label>
        <div>
          <button
            onClick={() => router.push('/product/new')}
            className='mr-2 border border-gray-300 rounded-md px-4 py-2 text-white bg-blue-800 hover:bg-blue-600 h-12 self-center'
          >
            + Novo Produto
          </button>
          <button
            onClick={() => router.push('/product/mult-create')}
            className='border border-gray-300 rounded-md px-4 py-2 text-white bg-blue-800 hover:bg-blue-600 h-12 self-center'
          >
            + Criar Multiplos
          </button>
        </div>
      </div>

      <div className='flex text-white flex-row'>
        <label className='mb-2 pl-4'>
          <span>Nome</span>
          <input
            type='radio'
            name='product'
            className='border border-gray-300 rounded-md px-4 py-2 text-black'
            onChange={(e) => {
              setFilter('name');
            }}
            value='name'
            defaultChecked
          />
        </label>
        <label className='mb-2 pl-4'>
          <span>Brand</span>
          <input
            type='radio'
            name='product'
            className='border border-gray-300 rounded-md px-4 py-2 text-black'
            onChange={(e) => {
              setFilter('brand');
            }}
            value='brand'
          />
        </label>
        <label className='mb-2 pl-4'>
          <span>Model</span>
          <input
            type='radio'
            name='product'
            className='border border-gray-300 rounded-md px-4 py-2 text-black'
            onChange={(e) => {
              setFilter('model');
            }}
            value='model'
            defaultChecked
          />
        </label>
        <label className='mb-2 pl-4'>
          <span>Price</span>
          <input
            type='radio'
            name='product'
            className='border border-gray-300 rounded-md px-4 py-2 text-black'
            onChange={(e) => {
              setFilter('price');
            }}
            value='price'
          />
        </label>

        <label className='mb-2 pl-4'>
          <span>Color</span>
          <input
            name='product'
            type='radio'
            className='border border-gray-300 rounded-md px-4 py-2 text-black'
            onChange={(e) => {
              setFilter('color');
            }}
            value='color'
          />
        </label>
        {filter === 'price' && (
          <div className='pl-4'>
            <label className='mb-2 pl-4'>
              Maior que
              <input
                type='radio'
                name='price-filter'
                value='greater'
                checked={filterPrice === 'greater'}
                onChange={() => setFilterPrice('greater')}
              />
            </label>
            <label className='mb-2 pl-4'>
              Menor que
              <input
                type='radio'
                name='price-filter'
                value='less'
                checked={filterPrice === 'less'}
                onChange={() => setFilterPrice('less')}
              />
            </label>
            <label className='mb-2 pl-4'>
              Igual a
              <input
                type='radio'
                name='price-filter'
                value='equal'
                checked={filterPrice === 'equal'}
                onChange={() => setFilterPrice('equal')}
              />
            </label>
          </div>
        )}
      </div>
      <div className='grid sm:grid-cols-3'>

        {data.length === 0 && 
          <p className='text-xl text-white mt-8 align-center'>Nenhum Produto contrado</p>
        }

        {!Array.isArray(filteredProducts) ? (
          <Loading />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TableProduct;
