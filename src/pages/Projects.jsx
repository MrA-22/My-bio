import { Link } from "react-router-dom"

export default function Projects() {
  const data = [
    { id: "whatsapp-bot", name: "WhatsApp Bot", desc: "BOT WhatsApp with many feature" },
    { id: "web-store", name: "Web Store", desc: "Web penjualan sederhana" },
    { id: "web-sis", name: "Web SIS", desc: "Web Sistem Informasi Sekolah" },
    { id: "pirate-osam", name: "Pirate OSAM", desc: "Game sederhana dengan mekanisme misi serta pertarungan ringan" },
    { id: "vr-home-design", name: "VR Home Design", desc: "Game virtual reality visualisasi desain interior rumah" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-blue-400 text-center mb-10">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((p, i) => (
          <Link to={`/projects/${p.id}`} key={i}>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:scale-105 transition cursor-pointer">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-400 mt-2">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}