// client/src/pages/AdminProduk.jsx
import { useEffect, useState } from "react";
import ProdukForm from "./ProdukForm";
import AdminLayout from "../components/AdminLayout";

export default function AdminProduk() {
  const [produks, setProduks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduk, setEditingProduk] = useState(null);

  useEffect(() => {
    fetchProduks();
  }, []);

  const fetchProduks = async () => {
    const res = await fetch("http://localhost:5000/api/produk");
    const data = await res.json();
    setProduks(data);
  };

  const handleEdit = (produk) => {
    setEditingProduk(produk);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus produk ini?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/produk/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProduks();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Kelola Produk</h1>

      <button
        onClick={() => {
          setEditingProduk(null);
          setShowForm(true);
        }}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        + Tambah Produk
      </button>

      {showForm && (
        <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-8">
          <ProdukForm
            produk={editingProduk}
            onSave={() => {
              setShowForm(false);
              fetchProduks();
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Harga</th>
              <th className="p-2 border">Stok</th>
              <th className="p-2 border">Jenis</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produks.map((produk) => (
              <tr key={produk.id} className="border-t">
                <td className="p-2 border">{produk.nama}</td>
                <td className="p-2 border">Rp {produk.harga}</td>
                <td className="p-2 border">{produk.stok}</td>
                <td className="p-2 border">{produk.jenis}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(produk)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(produk.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
