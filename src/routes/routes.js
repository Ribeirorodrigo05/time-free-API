import { Router } from "express";
import { createUser } from "../controllers/user/createUser.js";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.js";
import { validateUserData } from "../middlewares/validateUserData.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { loginController } from "../controllers/login/login.js";
import { hashPassword } from "../middlewares/hashPassword.js";

const router = Router();

router.post(
  "/create-user",
  ensureEmailNotExists,
  validateUserData,
  hashPassword,
  createUser.handle
);

router.get("/login", authenticateUser, loginController.handle);

export { router };
