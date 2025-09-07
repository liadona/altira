import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdSense from "../components/AdSense";
import { fetchArticleById } from "../api";

function ArtikelDetail() {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchArticleById(id).then(setArtikel).catch(console.error);
}, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!artikel) return <p className="text-center text-gray-500">Artikel tidak ditemukan</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <Link to="/" className="text-green-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-4 text-green-800">
        {artikel.judul}
      </h1>

      {artikel.gambar && (
        <img
        src={`http://localhost:5000${artikel.gambar}`}
        alt={artikel.judul}
        className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <div className="prose lg:prose-xl">
        {/* Iklan di tengah artikel */}
        <AdSense slot="1234567890" />
      </div>
      <p className="text-gray-700 leading-relaxed">{artikel.isi}</p>
      <p className="text-sm text-gray-400 mt-3">
        {new Date(artikel.created_at).toLocaleDateString("id-ID")}
      </p>

      <div className="prose lg:prose-xl">
        {/* Iklan di akhir artikel */}
        <AdSense slot="0987654321" />
      </div>       

    </div>

    
  );
}

export default ArtikelDetail;
