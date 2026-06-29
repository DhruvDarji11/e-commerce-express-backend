import { Router } from "express";
import {
  getLoggedInUserController,
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
} from "../controller/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.post("/refresh", authenticate, refreshAccessTokenController);
router.post("/logout", authenticate, logoutController);

router.get("/me", authenticate, getLoggedInUserController);

export default router;
