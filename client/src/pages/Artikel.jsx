// client/src/pages/Artikel.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../api";
import { API_BASE } from "../api";

export default function Artikel() {
  const [artikels] = useState([]);

  useEffect(() => {
  fetchArticles().then(setArtikel).catch(console.error);
}, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artikels.map((artikel) => (
        <div
          key={artikel.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          {artikel.gambar && (
            <img
            src={`${API_BASE}${artikel.gambar}`}
            alt={artikel.judul}
            className="w-full h-48 object-cover"
        />
          )}
          <div className="p-4">
            <h2 className="text-lg font-bold text-green-700 mb-2 line-clamp-2">
              {artikel.judul}
            </h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {artikel.isi}
            </p>
            <Link
              to={`/artikel/${artikel.id}`}
              className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Baca Selengkapnya
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
