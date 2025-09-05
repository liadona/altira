// client/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import ArtikelForm from "./ArtikelForm";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const [artikels, setArtikels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingArtikel, setEditingArtikel] = useState(null);

  useEffect(() => {
    fetchArtikels();
  }, []);

  const fetchArtikels = async () => {
    const res = await fetch("http://localhost:5000/api/artikel");
    const data = await res.json();
    setArtikels(data);
  };

  const handleEdit = (artikel) => {
    setEditingArtikel(artikel);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/artikel/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchArtikels();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Kelola Artikel</h1>

      <button
        onClick={() => {
          setEditingArtikel(null);
          setShowForm(true);
        }}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        + Tambah Artikel
      </button>

      {showForm && (
        <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-8">
          <ArtikelForm
            artikel={editingArtikel}
            onSuccess={() => {
              setShowForm(false);
              fetchArtikels();
            }}
          />
          <button
            onClick={() => setShowForm(false)}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Batal
          </button>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Artikel</h2>
        <ul className="divide-y divide-gray-200">
          {artikels.map((artikel) => (
            <li
              key={artikel.id}
              className="py-3 flex justify-between items-center"
            >
              <span>{artikel.judul}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(artikel)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(artikel.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
