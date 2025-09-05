// client/src/pages/ProdukList.jsx
import { useEffect, useState } from "react";

export default function ProdukList() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then((res) => res.json())
      .then((data) => setProduk(data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produk.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
        >
          {item.gambar && (
            <img
              src={`http://localhost:5000${item.gambar}`}
              alt={item.nama}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          )}
          <div className="p-4 flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-green-700">{item.nama}</h2>
            <p className="text-gray-600 text-sm flex-1 line-clamp-2">{item.deskripsi}</p>
            <p className="text-green-700 font-semibold mt-2">Rp {item.harga}</p>
            <p className="text-sm text-gray-500">Stok: {item.stok}</p>

            {item.jenis === "internal" ? (
              <a
                href={`https://wa.me/6282281102831?text=Saya ingin tertarik dengan Produk ${item.nama} apakah produk masih ada.?`}
                className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
              >
                Beli via WhatsApp
              </a>
            ) : (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-center"
              >
                Lihat di Shopee
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
