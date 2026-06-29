import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);

export default router;
