import { IProduct } from '@/components/ProductList';
import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: process.env.ENDPOINT_PRODUCT || "https://lexart-desafio-api.vercel.app/product",
});

export type CreateProduct = Omit<IProduct, 'id'>;
export type ProductDetails = {
  name: string;
  price: number;
  details: {
    model:string;
    brand: string;
    color:string;
  }
}

export class ProductService {
  public async getProducts(): Promise<IProduct[]> {
    const response = await api.get('/', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    if (response.status === 401) {
      return redirect('/auth/signin');
    }
    return response.data;
  }

  public async getProduct(id: number): Promise<IProduct> {
    const response = await api.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}` || undefined,
      },
    });
    if (response.status === 401) {
      return redirect('/auth/signin');
    }
    return response.data;
  }

  public async deleteProduct(id: number): Promise<boolean> {
    const response = await api.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response.data;
  }

  public async createProduct(
    product: CreateProduct
  ): Promise<IProduct | IProduct[]> {
    const response = await api.post('/new', product, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response.data;
  }

  public async createProductDetails(
    product: ProductDetails
  ): Promise<IProduct> {
    const response = await api.post('/new', product, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response.data;
  }


  public async createManyProduct(product: IProduct): Promise<IProduct[]> {
    const response = await api.post('/new', product, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response.data;
  }

  public async updateProduct(product: IProduct): Promise<IProduct> {
    const response = await api.put(`/${product.id}`, product, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response.data;
  }
}
