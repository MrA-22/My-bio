import { Link } from "react-router-dom"
import useDocumentTitle from "../hooks/useDocumentTitle"

export default function NotFound() {
  useDocumentTitle("404")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 pt-20 text-center">
      <p className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        404
      </p>
      <p className="text-gray-400">Halaman yang kamu cari tidak ditemukan.</p>
      <Link
        to="/"
        className="mt-2 px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-cyan-300 transition"
      >
        ← Kembali ke Home
      </Link>
    </div>
  )
}