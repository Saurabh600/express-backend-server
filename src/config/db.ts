import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./mydb.db");

export default db;
