"use client";
import { XCircle } from 'lucide-react';
import ModalProduct from '../ModalProduct';

type Props = {
  data: IProduct[],
  handleDelete: (id: number) => void,
}

export type IProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  color: string;

}

const TableProduct = ({ data, handleDelete }: Props) => {
  return (
    <table className="w-full text-sm text-left">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-2 max-w-[12rem] truncate">Name</th>
          <th className="py-2 px-2 max-w-[12rem] truncate">Brand</th>
          <th className="py-2 px-2 max-w-[12rem] truncate">Price</th>
          <th className="py-2 px-2 max-w-[12rem] truncate">Color</th>
          <th className="py-2 px-2 max-w-[3rem] truncate text-center">Editar/Apagar</th>
        </tr>
      </thead>
      <tbody className='text-xs'>
        {data?.map((product, index) => (
          <tr
            key={product.id}
            className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'}`}
          >
            <td className="py-1 px-1 max-w-[12rem] truncate">{product.name}</td>
            <td className="py-1 px-1 max-w-[12rem] truncate">{product.brand}</td>
            <td className="py-1 px-1 max-w-[12rem] truncate">{product.price}</td>
            <td className="py-1 px-1 max-w-[12rem] truncate">{product.color}</td>
            <td className="py-1 px-1 max-w-[12rem] truncate text-center flex gap-2 justify-center">
              <ModalProduct key={product.id} product={ product } />
              <button
                onClick={() => handleDelete(product.id)}
              >
                <XCircle size={18} stroke='red' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableProduct;