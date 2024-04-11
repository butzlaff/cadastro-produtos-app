'use server';

import { MultProducts } from '@/app/product/mult-create/page';
import { IProduct } from '@/components/ProductList';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: process.env.ENDPOINT_PRODUCT || 'http://localhost:3001/product',
});

export type CreateProduct = Omit<IProduct, 'id'>;
export type ProductDetails = {
  name: string;
  price: number;
  details: {
    model: string;
    brand: string;
    color: string;
  };
};

export async function getProducts(): Promise<IProduct[]> {
  const cookie = cookies().get('token')?.value;
  const response = await api.get('/', {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  if (response.status === 401) {
    return redirect('/auth/signin');
  }
  return response.data;
}

export async function getProduct(id: number): Promise<IProduct> {
  const cookie = cookies().get('token')?.value;

  const response = await api.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie}` || undefined,
    },
  });
  if (response.status === 401) {
    return redirect('/auth/signin');
  }
  return response.data;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const cookie = cookies().get('token')?.value;
  const response = await api.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.data;
}

export async function createProduct(
  product: CreateProduct
): Promise<IProduct | IProduct[]> {
  const cookie = cookies().get('token')?.value;
  const response = await api.post('/new', product, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.data;
}

export async function createProductDetails(
  product: ProductDetails
): Promise<IProduct> {
  const cookie = cookies().get('token')?.value;
  const response = await api.post('/new', product, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.data;
}

export async function createManyProduct(
  product: MultProducts[]
): Promise<IProduct[]> {
  const cookie = cookies().get('token')?.value;
  const response = await api.post('/new', product, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.data;
}

export async function updateProduct(product: IProduct): Promise<IProduct> {
  const cookie = cookies().get('token')?.value;
  const response = await api.put(`/${product.id}`, product, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.data;
}
