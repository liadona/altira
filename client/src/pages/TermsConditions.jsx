export default function TermsConditions() {
  return (
    <div className="space-y-8 text-gray-800">
      <h1 className="text-3xl font-bold text-green-700">Syarat & Ketentuan</h1>
      <p>
        Dengan mengakses dan menggunakan situs Altira, Anda setuju dengan syarat
        dan ketentuan berikut:
      </p>

      <section>
        <h2 className="text-xl font-semibold text-green-600">1. Penggunaan Situs</h2>
        <p>
          Situs ini digunakan hanya untuk tujuan informasi dan transaksi resmi
          terkait produk hortikultura Altira. Penggunaan untuk tujuan ilegal
          dilarang.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">2. Hak Kekayaan Intelektual</h2>
        <p>
          Seluruh konten termasuk teks, gambar, dan logo di situs ini dilindungi
          oleh hak cipta. Dilarang menyalin atau menyebarluaskan tanpa izin.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">3. Transaksi</h2>
        <p>
          Setiap transaksi produk dilakukan sesuai dengan ketentuan yang berlaku
          dan kebijakan harga dari Altira.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">4. Batasan Tanggung Jawab</h2>
        <p>
          Altira tidak bertanggung jawab atas kerugian yang timbul akibat
          penggunaan situs, keterlambatan, atau kegagalan akses layanan.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">5. Perubahan Syarat</h2>
        <p>
          Altira berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Anda
          diharapkan memeriksa halaman ini secara berkala.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
      </p>
    </div>
  );
}
