// src/pages/AdminUsers.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "admin" });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Gagal ambil data users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Tambah user baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/admin/users", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewUser({ username: "", password: "", role: "admin" });
      window.location.reload();
    } catch (err) {
      console.error("Gagal simpan user:", err);
    }
  };

  // Reset password
const handleReset = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:5000/api/admin/users/${id}/reset-password`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Password berhasil direset ke default (altira123)");
  } catch (err) {
    console.error("Gagal reset password:", err);
  }
};

// Hapus user
const handleDelete = async (id) => {
  if (!window.confirm("Yakin ingin menghapus user ini?")) return;
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter((u) => u.id !== id));
  } catch (err) {
    console.error("Gagal hapus user:", err);
  }
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Kelola Admin</h1>

      {/* Form Tambah Admin */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6 max-w-md">
        <h2 className="text-lg font-semibold mb-3">Tambah Admin Baru</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-3"
        >
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>

      {/* Tabel Daftar Admin */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Daftar Admin</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Username</th>
              <th className="border px-3 py-2 text-left">Role</th>
              <th className="border px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>

            

          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="border px-3 py-2">{u.username}</td>
                  <td className="border px-3 py-2">{u.role}</td>
                  <td className="border px-3 py-2">
                    <button 
                      onClick={() => handleReset(u.id)} 
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                        Reset Password
                    </button>
                    <button 
                      onClick={() => handleDelete(u.id)} 
                      className="bg-red-600 text-white px-2 py-1 rounded">
                        Hapus
                    </button>
                  </td>
                </tr>               
              ))                 
            ) : (
              <tr>
                <td colSpan="2" className="border px-3 py-2 text-center text-gray-500">
                  Belum ada admin
                </td>
              </tr>
            )}
          </tbody>
          </table>
      </div>
    </div>
  );
}
