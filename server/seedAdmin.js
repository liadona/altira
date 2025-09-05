// server/seedAdmin.js
import bcrypt from "bcryptjs";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "myfarmdb",
  password: process.env.DB_PASSWORD || "yourpassword",
  port: process.env.DB_PORT || 5432,
});

async function createAdminUser() {
  try {
    const username = "admini";
    const password = "123456";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    
    console.log("User admin created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createAdminUser();
