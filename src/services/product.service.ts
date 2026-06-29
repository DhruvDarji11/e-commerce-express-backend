import { Product } from "../models/product.model";
import { IProduct } from "../types/product.types";
import { ApiErrors } from "../utils/ApiErrors";
import { createSlug } from "../utils/slug";

export const createProduct = async (payload: IProduct) => {
  payload.slug = createSlug(payload.name);
  const product = await Product.create(payload);
  return product;
};

export const getProducts = async (page: number, limit: number, sort: any) => {
  const skip = (page - 1) * limit;
  const products = await Product.find().sort(sort).skip(skip).limit(limit);
  const total = await Product.countDocuments();
  return { products, pagination: { page, limit, total } };
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
