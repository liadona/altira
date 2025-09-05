// client/src/pages/ArtikelForm.jsx
import { useState, useEffect } from "react";

export default function ArtikelForm({ artikel, onSuccess }) {
  const [judul, setJudul] = useState(artikel?.judul || "");
  const [isi, setIsi] = useState(artikel?.isi || "");
  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    if (artikel) {
      setJudul(artikel.judul || "");
      setIsi(artikel.isi || "");
    }
  }, [artikel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("isi", isi);
      if (gambar) formData.append("gambar", gambar);

      const token = localStorage.getItem("token");

      const res = await fetch(
        artikel
          ? `http://localhost:5000/api/admin/artikel/${artikel.id}`
          : "http://localhost:5000/api/admin/artikel",
        {
          method: artikel ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // ⬅️ penting! bukan JSON
        }
      );

      if (!res.ok) throw new Error("Gagal menyimpan artikel");

      onSuccess && onSuccess(); // refresh list
    } catch (err) {
      console.error("Error simpan artikel:", err);
      alert("Gagal menyimpan artikel");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-4">
        {artikel ? "Edit Artikel" : "Tambah Artikel"}
      </h2>

      <div className="mb-3">
        <label className="block text-sm font-medium">Judul</label>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="mt-1 w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Isi</label>
        <textarea
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          className="mt-1 w-full border p-2 rounded"
          rows="5"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambar(e.target.files[0])}
          className="mt-1 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Simpan
      </button>
    </form>
  );
}
