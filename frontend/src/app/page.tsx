"use client"

import { ProductService } from '@/Services/Product';
import TableProduct from '@/components/TableProduct';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function Home() {
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
  
  return (   
    <div className='flex flex-col'>
    { products && <TableProduct data={ products }  /> }
    </div>
  );
}
