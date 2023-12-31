import { Router } from "express";
import { checkAuthController, loginController } from "../controllers/api/auth";

const router = Router();

router.post("/login", loginController);
router.get("/check-auth", checkAuthController);

export default router;
