import { IProduct } from '@/components/TableProduct';


export class ProductService {

  public async getProducts() : Promise<IProduct[]> {
    const response = await fetch('http://localhost:3001/product');
    const data = await response.json();
    return data;
  }

  public async getProduct(id: number) : Promise<IProduct> {
    const response = await fetch(`http://localhost:3001/product/${id}`);
    const data = await response.json();
    return data;
  }

  public async deleteProduct(id: number) : Promise<boolean> {
    const response = await fetch(`http://localhost:3001/product/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 204) return true;
    return false;
  };

  public async createProduct(product: IProduct) : Promise<IProduct | IProduct[]> {
    const response = await fetch('http://localhost:3001/product/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

  public async createManyProduct(product: IProduct) : Promise<IProduct[]> {
    const response = await fetch('http://localhost:3001/product/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

  public async updateProduct(product: IProduct) : Promise<IProduct> {
    const response = await fetch(`http://localhost:3001/product/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

}