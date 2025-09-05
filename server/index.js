import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "./db.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { requireSuperAdmin } from "./middleware/authMiddleware.js";



dotenv.config(); // load .env
// Setup __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Konfigurasi multer (simpan ke folder uploads)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unik
  },
});
const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());
//app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;


//const JWT_SECRET = "mysecretkey"; // nanti bisa pakai process.env.JWT_SECRET

// ==========================
// Middleware verifikasi JWT
// ==========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Token tidak ada" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token tidak valid" });
    req.user = user;
    next();
  });
}

// ==========================
// Public Routes
// ==========================
app.get("/api/artikel", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM artikel ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil artikel" });
  }
});

app.get("/api/artikel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM artikel WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Artikel tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil artikel" });
  }
});

// ==========================
// Admin Routes (Protected)
// ==========================

// Admin Login
// ✅ LOGIN pakai tabel users
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", { username, password }); // Debug

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    console.log("Query result:", result.rows); // Debug
    
    if (result.rows.length === 0) {
      console.log("Username not found"); // Debug
      return res.status(400).json({ error: "Username salah" });
    }

    const user = result.rows[0];
    console.log("User found:", user); // Debug

    // Bandingkan password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password valid:", validPassword); // Debug
    
    if (!validPassword) {
      return res.status(400).json({ error: "Password salah" });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, role: user.role, message: "Login berhasil" });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ==========================
// CRUD Admin Users (Superadmin Only)
// ==========================



app.get("/api/admin/users", authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    // hanya superadmin boleh melihat daftar
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const result = await pool.query("SELECT id, username, role FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil daftar admin" });
  }
});

app.post("/api/admin/users", authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1,$2,$3) RETURNING id, username, role",
      [username, hashedPassword, role || "admin"]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambah admin" });
  }
});

app.delete("/api/admin/users/:id", authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "Admin berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus admin" });
  }
});

// Reset password (superadmin)
app.put("/api/admin/users/:id/reset-password", authenticateToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const newPass = "altira123"; // default reset
  const hashed = await bcrypt.hash(newPass, 10);
  await pool.query("UPDATE users SET password=$1 WHERE id=$2", [hashed, id]);
  res.json({ message: "Password berhasil direset ke default" });
});

// Ubah password oleh user sendiri
app.put("/api/admin/change-password", authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "oldPassword dan newPassword wajib diisi" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password baru minimal 8 karakter" });
    }

    const result = await pool.query("SELECT id, password FROM users WHERE id=$1", [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ message: "Password lama salah" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password=$1 WHERE id=$2", [hashed, req.user.id]);

    res.json({ message: "Password berhasil diubah" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});



// Tambah Artikel
app.post("/api/admin/artikel", authenticateToken, upload.single("gambar"), async (req, res) => {
  try {
    const { judul, isi } = req.body;
    const gambarPath = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      "INSERT INTO artikel (judul, isi, gambar) VALUES ($1, $2, $3) RETURNING *",
      [judul, isi, gambarPath]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error tambah artikel:", err);
    res.status(500).json({ error: "Gagal menambah artikel" });
  }
});


// Edit Artikel
app.put("/api/admin/artikel/:id", authenticateToken, upload.single("gambar"), async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;
    const gambarPath = req.file ? `/uploads/${req.file.filename}` : null;

    let query, values;
    if (gambarPath) {
      query = "UPDATE artikel SET judul=$1, isi=$2, gambar=$3 WHERE id=$4 RETURNING *";
      values = [judul, isi, gambarPath, id];
    } else {
      query = "UPDATE artikel SET judul=$1, isi=$2 WHERE id=$3 RETURNING *";
      values = [judul, isi, id];
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Artikel tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error update artikel:", err);
    res.status(500).json({ error: "Gagal mengupdate artikel" });
  }
});


// Hapus Artikel
app.delete("/api/admin/artikel/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM artikel WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Artikel tidak ditemukan" });
    }
    res.json({ message: "Artikel berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus artikel" });
  }
});

// ==========================
// Produk (Public)
// ==========================
app.get("/api/produk", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produk ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil produk" });
  }
});

app.get("/api/produk/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM produk WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil produk" });
  }
});

// ==========================
// Produk (Admin Protected)
// ==========================

// Tambah Produk
app.post("/api/admin/produk", authenticateToken, upload.single("gambar"), async (req, res) => {
  try {
    const { nama, deskripsi, harga, stok, jenis, link } = req.body;
    const gambar = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      "INSERT INTO produk (nama, deskripsi, harga, stok, jenis, link, gambar) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [nama, deskripsi, harga, stok, jenis, link, gambar]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Gagal tambah produk:", err);
    res.status(500).json({ error: "Gagal menambah produk" });
  }
});

// ==========================
// Update Produk
// ==========================
app.put("/api/admin/produk/:id", authenticateToken, upload.single("gambar"), async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi, harga, stok, jenis, link } = req.body;
    const gambarPath = req.file ? `/uploads/${req.file.filename}` : req.body.gambar || null;

    const result = await pool.query(
      `UPDATE produk 
       SET nama=$1, deskripsi=$2, harga=$3, stok=$4, jenis=$5, link=$6, gambar=$7
       WHERE id=$8 RETURNING *`,
      [nama, deskripsi, harga, stok, jenis, link, gambarPath, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Gagal mengupdate produk:", err);
    res.status(500).json({ error: "Gagal mengupdate produk" });
  }
});



// Hapus Produk
app.delete("/api/admin/produk/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM produk WHERE id=$1", [id]);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
});


// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}
);
