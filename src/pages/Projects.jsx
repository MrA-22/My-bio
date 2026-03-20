import { Link } from "react-router-dom"

export default function Projects() {
  const games = [
    {
      id: "pirate-osam",
      name: "Pirate OSAM",
      desc: "Game sederhana dengan mekanisme misi serta pertarungan ringan",
    },
    {
      id: "vr-home-design",
      name: "VR Home Design",
      desc: "Game virtual reality untuk visualisasi desain interior rumah",
    },
  ]

  const webs = [
    {
      id: "whatsapp-bot",
      name: "WhatsApp Bot",
      desc: "BOT WhatsApp with many feature",
    },
    {
      id: "web-store",
      name: "Web Store",
      desc: "Web penjualan sederhana",
    },
    {
      id: "web-sis",
      name: "Web SIS",
      desc: "Web Sistem Informasi Sekolah",
    },
  ]

  const Card = ({ p }) => (
    <Link to={`/projects/${p.id}`}>
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-blue-400/40 hover:scale-[1.03] transition duration-300 cursor-pointer">
        <h2 className="text-xl font-semibold text-blue-400">
          {p.name}
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          {p.desc}
        </p>
      </div>
    </Link>
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-16 text-white">

      <h1 className="text-3xl font-bold text-blue-400 text-center">
        Projects
      </h1>

      {/* WEB SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-blue-400 border-b border-white/10 pb-2">
          🌐 Web Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {webs.map((p, i) => (
            <Card key={i} p={p} />
          ))}
        </div>
      </div>

      {/* GAME SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400 border-b border-white/10 pb-2">
          🎮 Game Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {games.map((p, i) => (
            <Card key={i} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}