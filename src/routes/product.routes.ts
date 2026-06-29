import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
} from "../controller/product.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SELLER"),
  validate(createProductSchema),
  createProductController
);
router.get("/", authenticate, getProductsController);
router.get("/:id", authenticate, getProductByIdController);
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "SELLER"),
  validate(updateProductSchema),
  updateProductController
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SELLER"),
  deleteProductController
);
export default router;
