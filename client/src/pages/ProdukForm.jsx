import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_BASE = API; // untuk gambar/file statis

function ProdukForm({ produk, onSave }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link, setLink] = useState("");
  const [gambar, setGambar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (produk) {
      setNama(produk.nama || "");
      setHarga(produk.harga || "");
      setDeskripsi(produk.deskripsi || "");
      setLink(produk.link || "");
    }
  }, [produk]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("link", link);
    if (gambar) formData.append("gambar", gambar);

    try {
      const res = await fetch(
        produk ? `${API}/api/admin/produk/${produk.id}` : `${API}/api/admin/produk`,
        {
          method: produk ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Gagal simpan produk");

      if (onSave) onSave(); // refresh list di parent
      navigate("/admin/produk");
    } catch (err) {
      console.error("Error simpan produk:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {produk ? "Edit Produk" : "Tambah Produk"}
      </h2>

      <input
        type="text"
        placeholder="Nama Produk"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Link Affiliate / WhatsApp"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setGambar(e.target.files[0])}
        className="w-full"
      />

      {produk?.gambar && (
        <img
          src={`${API_BASE}${produk.gambar}`}
          alt={produk.nama}
          className="w-32 h-32 object-cover rounded mt-2"
        />
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Simpan
      </button>
    </form>
  );
}

export default ProdukForm;
