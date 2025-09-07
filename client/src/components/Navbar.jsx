import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoAltira from "../assets/logo-altira.png";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 via-green-600 to-blue-600 text-white shadow-md">
      {/* Baris Atas: Logo dan Pencarian */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-2">
        {/* Logo - Lebar tetap */}
        <Link to="/" className="flex-shrink-0">
          <img src={LogoAltira} alt="Altira Logo" className="h-8 sm:h-10" />
        </Link>

        {/* Search Form - Mengambil sisa ruang */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white rounded-full overflow-hidden shadow-sm w-full sm:max-w-md"
        >
          <input
            type="text"
            placeholder="Cari artikel atau produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-1 sm:py-2 text-gray-700 outline-none w-full text-sm"
          />
          <button
            type="submit"
            className="bg-green-600 px-3 sm:px-4 py-1 sm:py-2 text-white hover:bg-green-700 transition text-sm sm:text-base"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Baris Bawah: Menu Navigasi */}
      <div className="bg-green-800 bg-opacity-70 px-2 py-1 sm:py-2">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base">
          <Link 
            to="/" 
            className="relative px-2 py-1 sm:px-3 sm:py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] sm:after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Artikel
          </Link>
          <Link 
            to="/produk" 
            className="relative px-2 py-1 sm:px-3 sm:py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] sm:after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Produk
          </Link>
          <Link 
            to="/tentang" 
            className="relative px-2 py-1 sm:px-3 sm:py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] sm:after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Tentang
          </Link>
          <Link 
            to="/kontak" 
            className="relative px-2 py-1 sm:px-3 sm:py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] sm:after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Kontak
          </Link>
          <Link 
            to="/admin/login" 
            className="relative px-2 py-1 sm:px-3 sm:py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] sm:after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;