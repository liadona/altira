export default function Kontak() {
  return (
    <div className="space-y-10 text-gray-800">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Kontak Kami</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Hubungi kami untuk kerja sama, pertanyaan, atau informasi lebih lanjut.
        </p>
      </section>

      {/* Info Kontak */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Nama & WA */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Nama Kontak</h2>
          <p>Ayu Lusiana Agustha</p>
          <p className="mt-2">
            📞 <a href="tel:082281102831" className="text-green-600 hover:underline">082281102831</a>
          </p>
          <p className="mt-1">
            💬 <a href="https://wa.me/6282281102831" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">
              WhatsApp
            </a>
          </p>
        </div>

        {/* Facebook & Email */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Media Sosial</h2>
          <p>
            🌐 <a href="https://facebook.com/Altira" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              Facebook: Altira
            </a>
          </p>
          <p className="mt-2">
            ✉️ <a href="mailto:sabat.adons@gmail.com" className="text-green-600 hover:underline">
              sabat.adons@gmail.com
            </a>
          </p>
        </div>

        {/* Alamat */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Alamat</h2>
          <p>
            Jln Kartini ds.III Nawangsasi, Tugumulyo, Kabupaten Musi Rawas, Sumatera Selatan
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-green-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          Kami Siap Membantu Anda
        </h2>
        <p className="mb-4">Klik tombol di bawah untuk langsung terhubung via WhatsApp.</p>
        <a
          href="https://wa.me/6282281102831"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Chat WhatsApp
        </a>
      </section>
    </div>
  );
}
