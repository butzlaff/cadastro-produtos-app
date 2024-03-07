'use client';

import { ProductService } from '@/Services/Product';
import { getSession } from '@/Services/User';
import TableProduct from '@/components/ProductList';
import useUserStore from '@/context/useUserStore';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function Home() {
  const router = useRouter();
  const setUser = useUserStore((state: any) => state.setUser)
  const { data: products } = useQuery(['get_products'], async () => {
    try {
      const service = new ProductService();
      const [products, user] = await Promise.all([
        service.getProducts(),
        getSession(),
      ]);
      setUser(user.username);
      return products;
      
    } catch (error) {
      router.push('/auth/signin');
    }
  });

  return (
    <div className='flex flex-col'>
      {products && <TableProduct data={products} />}
    </div>
  );
}
