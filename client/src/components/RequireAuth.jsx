// client/src/components/RequireAuth.jsx
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🚫 kalau belum login, redirect ke login
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
