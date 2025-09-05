import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoAltira from "../assets/logo-altira.png"; // ✅ import logo



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
    <nav className="bg-gradient-to-r from-green-700 via-green-600 to-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* ✅ Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={LogoAltira} alt="Altira Logo" className="h-10" />
        
      </Link>

      <form
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-full overflow-hidden shadow-md mx-6 flex-1 max-w-md"
    >
      <input
        type="text"
        placeholder="Cari artikel atau produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 text-gray-700 outline-none w-full"
      />
      <button
        type="submit"
        className="bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
      >
        🔍
      </button>
    </form>

      <div className="flex space-x-6">
        <Link to="/" className="relative px-3 py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          Artikel
        </Link>
        <Link to="/produk" className="relative px-3 py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          Produk
        </Link>
        <Link to="/tentang" className="relative px-3 py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          Tentang
        </Link>
        <Link to="/kontak" className="relative px-3 py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          Kontak
        </Link>
        <Link to="/admin/login" className="relative px-3 py-2 hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          Admin
        </Link>

        
      </div>
    </nav>
  );
}

export default Navbar;
