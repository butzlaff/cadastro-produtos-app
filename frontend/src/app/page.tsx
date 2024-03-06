"use client"

import { ProductService } from '@/Services/Product';
import TableProduct from '@/components/TableProduct';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';

export default function Home() {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { data: products } = useQuery(['get_products'], async () => {
    try {
      const service = new ProductService();
      const products = await service.getProducts();
      return products;
    } catch (error) {
      router.push('/auth/signin')
    }
  });
  
  const { mutate: handleDelete } = useMutation({
    mutationFn: async (id: number) => {
      const service = new ProductService();
      await service.deleteProduct(id);
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
      })}
  });


  return (   
    <div className='flex flex-col'>
    { products && <TableProduct data={ products } handleDelete={ handleDelete } /> }
    </div>
  );
}
