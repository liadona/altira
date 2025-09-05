import { useState, useEffect } from "react";

export default function ProdukForm({ produk, onSave = () => {}, onCancel }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [jenis, setJenis] = useState("internal"); // default internal
  const [link, setLink] = useState("");
  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    if (produk) {
      setNama(produk.nama || "");
      setDeskripsi(produk.deskripsi || "");
      setHarga(produk.harga || "");
      setStok(produk.stok || "");
      setJenis(produk.jenis || "internal");
      setLink(produk.link || "");
      setGambar(null); // reset file setiap kali edit
    }
  }, [produk]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("harga", harga);
      formData.append("stok", stok);
      formData.append("jenis", jenis);
      if (jenis === "affiliate") {
        formData.append("link", link);
      }
      if (gambar) {
        formData.append("gambar", gambar);
      }

      const url = produk
        ? `http://localhost:5000/api/admin/produk/${produk.id}`
        : "http://localhost:5000/api/admin/produk";

      const method = produk ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gagal simpan produk: ${errText}`);
      }

      const data = await res.json();
      onSave(data);
    } catch (err) {
      console.error("Error simpan produk:", err);
      alert("Gagal simpan produk. Cek console.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium">Nama Produk</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Harga</label>
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Stok</label>
        <input
          type="number"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Jenis Produk</label>
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="internal">Internal</option>
          <option value="affiliate">Affiliate (Shopee, Tokopedia, dll)</option>
        </select>
      </div>

      {jenis === "affiliate" && (
        <div>
          <label className="block text-sm font-medium">Link Afiliasi</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log("File dipilih:", e.target.files[0]);
            setGambar(e.target.files[0]);
          }}
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
