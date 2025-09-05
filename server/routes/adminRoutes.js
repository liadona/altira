import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// contoh route admin yang dilindungi
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Selamat datang di Dashboard Admin!",
    user: req.user,
  });
});

// contoh route tambah artikel (hanya admin login yang bisa)
router.post("/artikel", authenticateToken, (req, res) => {
  const { title, content } = req.body;
  // di sini nanti insert ke PostgreSQL
  res.json({ message: "Artikel berhasil ditambahkan", title, content });
});

export default router;
