export default function PrivacyPolicy() {
  return (
    <div className="space-y-8 text-gray-800">
      <h1 className="text-3xl font-bold text-green-700">Kebijakan Privasi</h1>
      <p>
        Altira menghargai privasi Anda. Halaman ini menjelaskan bagaimana kami
        mengumpulkan, menggunakan, dan melindungi data pribadi pengguna.
      </p>

      <section>
        <h2 className="text-xl font-semibold text-green-600">1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami dapat mengumpulkan informasi seperti nama, email, nomor telepon,
          alamat, serta data penggunaan situs saat Anda berinteraksi dengan
          layanan kami.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">2. Penggunaan Informasi</h2>
        <p>
          Data yang dikumpulkan digunakan untuk meningkatkan layanan, memberikan
          informasi produk, serta komunikasi pemasaran sesuai kebutuhan Anda.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">3. Keamanan Data</h2>
        <p>
          Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi
          informasi pribadi Anda dari akses tidak sah atau penyalahgunaan.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">4. Pihak Ketiga</h2>
        <p>
          Kami tidak menjual atau membagikan data pribadi Anda kepada pihak
          ketiga, kecuali jika diwajibkan oleh hukum atau untuk keperluan
          operasional layanan.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">5. Perubahan Kebijakan</h2>
        <p>
          Altira dapat memperbarui kebijakan privasi ini sewaktu-waktu. Kami
          menyarankan Anda untuk meninjau halaman ini secara berkala.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
      </p>
    </div>
  );
}
