import { XCircle } from 'lucide-react';
import { useState } from 'react';
import ModalProduct from '../ModalProduct';
type Props = {
  data: IProduct[];
  handleDelete: (id: number) => void;
};

export type IProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  color: string;
};

const TableProduct = ({ data, handleDelete }: Props) => {
  const [searched, setSearched] = useState<string>('');
  const [filter, setFilter] = useState<keyof Omit<IProduct, 'id'>>('name');
  const [filterPrice, setFilterPrice] = useState<'greater' | 'less' | 'equal'>(
    'equal'
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(data);

  const filterProducts = () => {
    let filteredProd: IProduct[] = [];
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

  return (
    <>
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
      {!searched && <span className='text-red-500'>*Campo obrigatório</span>}

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

      <table className='w-full text-sm text-left min-w-[48rem]'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='py-2 px-2 max-w-[12rem] truncate'>Name</th>
            <th className='py-2 px-2 max-w-[12rem] truncate'>Brand</th>
            <th className='py-2 px-2 max-w-[12rem] truncate'>Price</th>
            <th className='py-2 px-2 max-w-[12rem] truncate'>Color</th>
            <th className='py-2 px-2 max-w-[3rem] truncate text-center'>
              Editar/Apagar
            </th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          {filteredProducts?.map((product, index) => (
            <tr
              key={product.id}
              className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'}`}
            >
              <td className='py-1 px-1 max-w-[12rem] truncate'>
                {product.name}
              </td>
              <td className='py-1 px-1 max-w-[12rem] truncate'>
                {product.brand}
              </td>
              <td className='py-1 px-1 max-w-[12rem] truncate'>
                {Number(product.price).toFixed(2)}
              </td>
              <td className='py-1 px-1 max-w-[12rem] truncate'>
                {product.color}
              </td>
              <td className='py-1 px-1 max-w-[12rem] truncate text-center flex gap-2 justify-center'>
                <ModalProduct key={product.id} product={product} />
                <button onClick={() => handleDelete(product.id)}>
                  <XCircle size={18} stroke='red' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableProduct;
