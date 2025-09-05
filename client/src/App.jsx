import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Artikel from "./pages/Artikel";
import ArtikelDetail from "./pages/ArtikelDetail";
import ArtikelForm from "./pages/ArtikelForm";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import AdminProduk from "./pages/AdminProduk";   // ✅ Import
import ProdukList from "./pages/ProdukList";
import SearchResult from "./pages/SearchResult";
import Navbar from "./components/Navbar"; 
import RequireAuth from "./components/RequireAuth";
import AdminUsers from "./pages/AdminUsers";
import AdminLayout from "./components/AdminLayout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Footer from "./components/Footer";
import CookiesConsent from "./components/CookiesConsent";
import ChangePassword from "./pages/ChangePassword";
import RequireSuperAdmin from "./components/RequireSuperAdmin";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 container mx-auto p-6">
          <Routes>
            
            <Route path="/artikel/:id" element={<ArtikelDetail />} />
            <Route path="/produk" element={<ProdukList />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/" element={<Artikel />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />

           {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<RequireAuth> <AdminLayout> <AdminDashboard /> </AdminLayout> </RequireAuth> } />
            <Route path="/admin/artikel/new" element={<RequireAuth> <AdminLayout> <ArtikelForm /> </AdminLayout> </RequireAuth> } />
            <Route path="/admin/artikel/edit/:id" element={<RequireAuth> <AdminLayout> <ArtikelForm /> </AdminLayout> </RequireAuth> } />
            <Route path="/admin/produk" element={<RequireAuth> <AdminLayout> <AdminProduk /> </AdminLayout> </RequireAuth> } />
            <Route path="/admin/users" element={<RequireAuth> <RequireSuperAdmin> <AdminLayout> <AdminUsers /> </AdminLayout> </RequireSuperAdmin> </RequireAuth> } /> 
            <Route path="/admin/profile" element={<RequireAuth> <AdminLayout> <ChangePassword /> </AdminLayout> </RequireAuth> } />           
          </Routes>
        </main>
            <CookiesConsent />
        
        
        {/* Footer */}
          <Footer />

      </div>
    </Router>
  );
}

export default App;
