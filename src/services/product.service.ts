import { Product } from "../models/product.model";
import { IProduct } from "../types/product.types";
import { ApiErrors } from "../utils/ApiErrors";

export const createProduct = async (payload: IProduct) => {
  const product = await Product.create(payload);
  return product;
};

export const getProducts = async () => {
  const products = await Product.find();
  return products;
};
export const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiErrors(404, "Product not found");
  }
  return product;
};

export const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};
