import pkg from "pg";
const { Pool } = pkg;

// sesuaikan dengan PostgreSQL kamu
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myfarmdb",
  password: "Sabat.adons^10", // ganti sesuai password PostgreSQL kamu
  port: 5432,
});

try {
  await pool.connect();
  console.log("Connected to PostgreSQL database successfully");
} catch (err) {
  console.error("Database connection error:", err);
}

export default pool;
