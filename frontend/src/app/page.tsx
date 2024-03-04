"use client"

import { ProductService } from '@/Services/Product';
import TableProduct from '@/components/TableProduct';
import { useQuery, useQueryClient } from 'react-query';
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
  const handleDelete = (id: number) => {
    console.log(id)
  }

  return (   
    <>
    { products && <TableProduct data={ products } handleDelete={ handleDelete } /> }
    </>
  );
}
