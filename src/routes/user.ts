import { Router } from "express"
import {
  createUserWithEmailAndPassword,
  getAllUsers,
  getUserById,
} from "../controllers/api/user"
import pool from "../config/mysql"

const router = Router()

router.get("/all", getAllUsers)
router.get("/one/:userId", getUserById)
// router.put("/", (req, res) => {});
router.post("/", createUserWithEmailAndPassword)
// router.delete("/", (req, res) => {});

router.get("/hi", async (req, res) => {
  const connection = await pool.getConnection()
  const [data] = await connection.query("DESCRIBE Users;")
  connection.release()
  res.status(200).json({
    status: true,
    route: req.originalUrl,
    info: "Users table description",
    COLUMNS: (data as any[]).map((item) => Object.values(item).join(" ")),
  })
})

export default router
