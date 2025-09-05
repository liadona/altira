// src/components/RequireSuperAdmin.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function RequireSuperAdmin({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== "superadmin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  } catch (err) {
    console.error("Token invalid", err);
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
