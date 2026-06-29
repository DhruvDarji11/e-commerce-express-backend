export interface IProductImage {
  url: string;
  alt?: string;
}

export interface IProductVariant {
  name: string;
  value: string;
  additionalPrice?: number;
}

export type ProductStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  images: IProductImage[];
  variants: IProductVariant[];
  status: ProductStatus;
}
