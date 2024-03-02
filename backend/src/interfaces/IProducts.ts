export interface IProduct {
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