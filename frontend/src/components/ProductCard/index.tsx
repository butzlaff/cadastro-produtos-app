import { useRouter } from 'next/navigation';
import { IProduct } from '../TableProduct';

type HandleDelete = (id: number) => void;

const ProductCard: React.FC<{ product: IProduct, handleDelete: HandleDelete }> = ({ product, handleDelete }) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-64">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Price:</span> ${product.price}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Color:</span> {product.color}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Model:</span> {product.model}
        </p>
        <button
          className='bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-full'
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
        <button
          className='bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors duration-300 w-full'
          onClick={() => router.push(`/product/edit/${product.id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;