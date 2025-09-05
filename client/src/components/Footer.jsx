export default function Footer() {
  return (
    <footer className="bg-green-700 text-white text-center py-4 space-y-2">
  <p>© {new Date().getFullYear()} Altira. All rights reserved.</p>
  <div className="space-x-4">
    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
    <a href="/terms-conditions" className="hover:underline">Syarat & Ketentuan</a>
  </div>
</footer>

  );
}
