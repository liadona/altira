// client/src/api.js
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_BASE = API; // untuk gambar atau base URL umum

export async function fetchArticles() {
  const res = await fetch(`${API}/api/artikel`);
  if (!res.ok) throw new Error("Gagal fetch artikel");
  return res.json();
}

export async function fetchArticleById(id) {
  const res = await fetch(`${API}/api/artikel/${id}`);
  if (!res.ok) throw new Error("Artikel tidak ditemukan");
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API}/api/produk`);
  if (!res.ok) throw new Error("Gagal fetch produk");
  return res.json();
}

export async function loginAdmin(credentials) {
  const res = await fetch(`${API}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login gagal");
  return res.json();
}

// contoh untuk reset password superadmin
export async function resetPassword(id, token) {
  const res = await fetch(`${API}/api/admin/users/${id}/reset-password`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal reset password");
  return res.json();
}

