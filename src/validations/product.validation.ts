import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Product name minimum 3 characters"),
  description: z.string().min(10, "Product description minimum 3 characters"),
  price: z.number().positive("Product price must be greater than 0"),
  discount:z.number().min(0).max(100).optional(),
  category: z.string().min(2),
  brand:z.string(),
  sku:z.string(),
  stock: z.number().min(0),
  status: z.enum(["ACTIVE", "INACTIVE","DRAFT"]).optional(),
});

export const updateProductSchema = createProductSchema.optional();
