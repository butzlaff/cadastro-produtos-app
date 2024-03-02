export interface IProduct {
  id?: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  color: string;
};

export interface IProductData {
  name: string;
  brand: string;
  model: string;
  data: [
    {
      price: number;
      color: string;
    },
  ],
};

export interface IProductDetails  {
  name: string;
  price: number;
  details: {
    brand: string;
    model: string;
    color: string;
  };
};

export type TProducts = IProduct | IProductData[] | IProductDetails;