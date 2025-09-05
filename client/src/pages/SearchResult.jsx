// client/src/pages/SearchResult.jsx
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function SearchResult() {
  const [artikels, setArtikels] = useState([]);
  const [produk, setProduk] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (!query) return;

    // fetch artikel
    fetch("http://localhost:5000/api/artikel")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((a) =>
          a.judul.toLowerCase().includes(query.toLowerCase()) ||
          a.isi.toLowerCase().includes(query.toLowerCase())
        );
        setArtikels(filtered);
      });

    // fetch produk
    fetch("http://localhost:5000/api/produk")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) =>
          p.nama.toLowerCase().includes(query.toLowerCase()) ||
          p.deskripsi.toLowerCase().includes(query.toLowerCase())
        );
        setProduk(filtered);
      });
  }, [query]);

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Hasil pencarian untuk: "{query}"
      </h1>

      {/* Artikel */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Artikel</h2>
        {artikels.length === 0 ? (
          <p className="text-gray-500">Tidak ada artikel ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artikels.map((artikel) => (
              <div key={artikel.id} className="bg-white rounded shadow p-4">
                <h3 className="font-bold text-green-700">{artikel.judul}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{artikel.isi}</p>
                <Link
                  to={`/artikel/${artikel.id}`}
                  className="text-green-600 text-sm hover:underline"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Produk */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Produk</h2>
        {produk.length === 0 ? (
          <p className="text-gray-500">Tidak ada produk ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produk.map((item) => (
              <div key={item.id} className="bg-white rounded shadow p-4">
                {item.gambar && (
                  <img
                    src={`http://localhost:5000${item.gambar}`}
                    alt={item.nama}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h3 className="font-bold text-green-700 mt-2">{item.nama}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.deskripsi}</p>
                <p className="font-semibold text-green-700">Rp {item.harga}</p>
                {item.jenis === "internal" ? (
                  <a
                    href={`https://wa.me/6282281102831?text=Saya ingin pesan ${item.nama}`}
                    className="mt-2 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Beli via WhatsApp
                  </a>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm"
                  >
                    Lihat di Shopee
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
