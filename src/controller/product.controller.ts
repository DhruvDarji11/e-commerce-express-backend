import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/product.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res
      .status(201)
      .json(new ApiResponse(true, "Product created successfully", product));
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while creating Product",
          (error as any).message
        )
      );
  }
};

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res
      .status(200)
      .json(new ApiResponse(true, "Products fetched successfully", products));
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while creating Product",
          (error as any).message
        )
      );
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id as string);
    res
      .status(200)
      .json(new ApiResponse(true, "Product fetched successfully", product));
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while creating Product",
          (error as any).message
        )
      );
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const product = await updateProduct(
      req.params.id as string,

      req.body
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Product updated successfully", product));
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while creating Product",
          (error as any).message
        )
      );
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id as string);

    res
      .status(200)
      .json(new ApiResponse(true, "Product deleted successfully", null));
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while creating Product",
          (error as any).message
        )
      );
  }
};
