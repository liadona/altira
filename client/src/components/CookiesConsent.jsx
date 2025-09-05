import { useState, useEffect } from "react";
import { Cookie } from "lucide-react"; // ✅ ikon dari lucide-react

export default function CookiesConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] 
      bg-black/70 backdrop-blur-lg text-white rounded-2xl p-4 shadow-lg border border-white/10 
      flex flex-col md:flex-row items-center justify-between gap-4 z-50 animate-fadeIn">
      
      {/* Ikon Cookie */}
      <div className="flex items-center gap-2">
        <div className="bg-yellow-400/20 p-2 rounded-full">
          <Cookie className="text-yellow-400 w-6 h-6" />
        </div>
        <p className="text-sm leading-relaxed">
          Kami menggunakan cookies 🍪 untuk meningkatkan pengalaman Anda. 
          Dengan melanjutkan, berarti Anda menyetujui sesuai{" "}
          <a href="/privacy-policy" className="text-green-400 underline">
            Kebijakan Privasi
          </a>.
        </p>
      </div>

      {/* Tombol */}
      <div className="flex gap-2">
        <button
          onClick={handleDecline}
          className="px-4 py-2 rounded-full bg-gray-600 hover:bg-gray-500 transition"
        >
          Tolak
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 transition"
        >
          Terima
        </button>
      </div>
    </div>
  );
}
