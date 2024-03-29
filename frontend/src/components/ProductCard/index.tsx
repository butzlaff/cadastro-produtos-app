import { useRouter } from 'next/navigation';
import { IProduct } from '../ProductList';

type HandleDelete = (id: number) => void;

const ProductCard: React.FC<{
  product: IProduct;
  handleDelete: HandleDelete;
}> = ({ product, handleDelete }) => {
  const router = useRouter();

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden m-4 w-64'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{product.name}</div>
        <p className='text-gray-700 text-base'>
          <span className='font-semibold'>Brand:</span> {product.brand}
        </p>
        <p className='text-gray-700 text-base'>
          <span className='font-semibold'>Price:</span> ${product.price}
        </p>
        <p className='text-gray-700 text-base'>
          <span className='font-semibold'>Color:</span> {product.color}
        </p>
        <p className='text-gray-700 text-base'>
          <span className='font-semibold'>Model:</span> {product.model}
        </p>
        <button
          className='bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full mt-2'
          onClick={() => router.push(`/product/createclone/${product.id}`)}
        >
          Clonar Produto
        </button>
        <button
          className='bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors duration-300 w-full mt-2'
          onClick={() => router.push(`/product/edit/${product.id}`)}
        >
          Editar
        </button>
        <button
          className='bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-full mt-2'
          onClick={() => handleDelete(product.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
