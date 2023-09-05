import { Router } from "express";
import pool from "../config/mysql";

const router = Router();

router.get("/hi", async (req, res) => {
  const connection = await pool.getConnection();
  const [data] = await connection.query("DESCRIBE Todos;");
  connection.release();
  res.status(200).json({
    status: true,
    route: req.originalUrl,
    info: "Users table description",
    COLUMNS: (data as any[]).map((item) => Object.values(item).join(" ")),
  });
});

export default router;
