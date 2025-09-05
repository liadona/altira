// client/src/components/AdminLayout.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Token invalid", err);
      }
    }
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-green-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="block px-3 py-2 rounded hover:bg-green-700"
          >
            Artikel
          </Link>
          <Link
            to="/admin/produk"
            className="block px-3 py-2 rounded hover:bg-green-700"
          >
            Produk
          </Link>

          {/* 🔐 hanya tampil kalau role = superadmin */}
          {role === "superadmin" && (
            <Link to="/admin/users" className="block px-3 py-2 rounded hover:bg-green-700">
              Kelola Admin
            </Link>
          )}

          <Link to="/admin/profile" className="block px-4 py-2 rounded hover:bg-green-700">
            Profil & Password
        </Link>


        </nav>
        <button
          onClick={handleLogout}
          className="m-4 px-3 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
