import { Router } from "express";
import { createUser } from "../controllers/user/createUser.js";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.js";

const router = Router();

router.post("/create-user", ensureEmailNotExists, createUser.handle);

export { router };
