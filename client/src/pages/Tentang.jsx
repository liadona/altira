export default function Tentang() {
  return (
    <div className="space-y-12 text-gray-800">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Tentang Altira</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Altira berkomitmen dalam pengolahan, perdagangan, dan distribusi produk hortikultura 
          dengan fokus pada keberlanjutan dan kesejahteraan petani.
        </p>
      </section>

      {/* Visi */}
      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Visi</h2>
        <p>
          Menjadi mitra agribisnis terdepan dalam pengolahan, perdagangan, dan distribusi 
          produk hortikultura.
        </p>
      </section>

      {/* Misi */}
      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Misi</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Meningkatkan kesejahteraan petani melalui kemitraan.</li>
          <li>Menghadirkan produk hortikultura berkualitas ke pasar nasional dan global.</li>
          <li>Penerapan dan inovasi teknologi pertanian berkelanjutan.</li>
        </ul>
      </section>

      {/* Sejarah */}
      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Sejarah Altira</h2>
        <p>
          Kami lahir dari semangat petani lokal yang ingin memperluas pasar hortikultura ke 
          tingkat nasional dan internasional. Dengan dukungan teknologi modern, kami hadir 
          sebagai penghubung antara petani dan konsumen.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center bg-green-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          Mari tumbuh bersama Altira
        </h2>
        <p className="mb-4">
          Hubungi kami untuk informasi lebih lanjut atau peluang kerja sama.
        </p>
        <a
          href="/kontak"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Hubungi Kami
        </a>
      </section>
    </div>
  );
}
