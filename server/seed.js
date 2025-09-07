// server/seed.js
import pool from "./db.js";

async function seed() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin'
      );
    `);

    await pool.query(`
      INSERT INTO users (username, password, role)
      VALUES ('superadmin', '$2b$10$7uHsJcO..nQb9O4xRrqZTe6XNoD2f0Bjq5z3d6gQyWptkXjz2G4dW', 'superadmin')
      ON CONFLICT (username) DO NOTHING;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS artikel (
        id SERIAL PRIMARY KEY,
        judul VARCHAR(255),
        isi TEXT,
        gambar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      INSERT INTO artikel (judul, isi, gambar)
      VALUES 
      ('Artikel Pertama', 'Ini adalah isi artikel pertama Altira.', '/uploads/artikel1.jpg'),
      ('Artikel Kedua', 'Artikel kedua untuk testing.', '/uploads/artikel2.jpg');
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS produk (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(255),
        deskripsi TEXT,
        harga NUMERIC,
        link VARCHAR(500),
        gambar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      INSERT INTO produk (nama, deskripsi, harga, link, gambar)
      VALUES
      ('Bibit Cabai Unggul', 'Bibit cabai dengan produktivitas tinggi.', 25000, 'https://shopee.co.id/bibit-cabai', '/uploads/produk1.jpg'),
      ('Pupuk Organik Altira', 'Pupuk ramah lingkungan untuk tanaman hortikultura.', 45000, 'https://tokopedia.com/pupuk-altira', '/uploads/produk2.jpg');
    `);

    console.log("✅ Database berhasil di-seed!");
  } catch (err) {
    console.error("❌ Error saat seed:", err);
  } finally {
    pool.end();
  }
}

seed();
