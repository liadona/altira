import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";   // 🔥 pakai base API dari api.js

function Input({ label, type, value, onChange }) {
  const [shown, setShown] = useState(false);

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={shown ? "text" : type}
        value={value}
        onChange={onChange}
        required
        autoComplete="off"
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="button"
        onClick={() => setShown(!shown)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
      >
        {shown ? "Sembunyikan" : "Lihat"}
      </button>
    </div>
  );
}

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Password baru dan konfirmasi tidak sama!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE}/api/admin/change-password`,   // 🔥 sudah dinamis
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Password berhasil diubah");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Gagal mengubah password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ubah Password</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Password Lama"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          label="Password Baru"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          label="Konfirmasi Password Baru"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ubah Password
        </button>
      </form>
    </div>
  );
}
