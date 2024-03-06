import {
  IProduct,
  IProductData,
  IProductDetails,
  TProducts
} from '@/interfaces/IProducts';

export default class ProductOrganizer {
  public organizeProduct(productData: TProducts): IProduct | IProduct[] {
    if (Array.isArray(productData)) {
      // Organiza Estrutura 3
      return this.organizeProductType3(productData);
    } else if ('details' in productData) {
      // Organiza Estrutura 2
      return this.organizeProductType2(productData);
    } else {
      // Retorna Estrutura 1
      return productData;
    }
  }

  private organizeProductType2(productData: IProductDetails): IProduct {
    const { name, details, price } = productData;
    const { brand, model, color } = details;
    return { name, brand, model, price, color };
  }

  private organizeProductType3(productsData: IProductData[]): IProduct[] {
    return productsData.map(productData => {
        const { name, brand, model, data } = productData;
        return data.map((product: any) => ({ name, brand, model, ...product }));
    }).flat();
  }
};