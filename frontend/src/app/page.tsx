"use client"

import { ProductService } from '@/Services/Product';
import TableProduct from '@/components/TableProduct';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';

export default function Home() {
  const queryClient = useQueryClient();

  const { data: products } = useQuery(['get_products'], () => {
    try {
      const service = new ProductService();
      const products = service.getProducts();
      return products;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu algum erro!',
        timer: 5000,
      })
    }
  });
  const { mutate: handleDelete } = useMutation({
    mutationFn: async (id: number) => {
      const service = new ProductService();
      await service.deleteProduct(id);
    },
    onSuccess: () => {
      Swal.fire('Deletado com Suceso!');
      queryClient.invalidateQueries(['get_products']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado!',
      })}
  });


  return (   
    <div className='flex flex-col'>
    { products && <TableProduct data={ products } handleDelete={ handleDelete } /> }
    </div>
  );
}
