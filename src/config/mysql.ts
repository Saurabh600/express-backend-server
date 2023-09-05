import { createPool } from "mysql2/promise";

const pool = createPool({
  user: "root",
  password: "saurabh123",
  host: "127.0.0.1",
  port: 3306,
  database: "dummy_express",
});

export default pool;
