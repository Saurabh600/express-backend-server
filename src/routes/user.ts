import { Router } from "express";
import {
  createUserWithEmailAndPassword,
  getAllUsers,
  getUserById,
} from "../controllers/user";

const router = Router();

router.get("/all", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUserWithEmailAndPassword);
router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

export default router;
