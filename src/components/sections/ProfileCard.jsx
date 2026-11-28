import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import profileImg from "../../assets/profile.jpg"
import { profile } from "../../data/profile"

const info = [
  { label: "Role", value: "Developer" },
  { label: "Focus", value: "Game & Web Systems" },
  { label: "Location", value: profile.location },
  { label: "Status", value: "Student / Developer" },
]

export default function ProfileCard({ onViewCV }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="lg:sticky lg:top-24 self-start relative bg-black/40 backdrop-blur-2xl p-6 rounded-3xl border border-cyan-500/20 shadow-[0_0_60px_rgba(34,211,238,0.2)]"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

      <div className="flex justify-center relative z-10">
        <img
          src={profileImg}
          alt={`Foto ${profile.name}`}
          className="w-36 h-36 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_40px_#22d3ee] hover:scale-110 transition"
        />
      </div>

      <div className="mt-4 text-center relative z-10">
        <span className="bg-green-500/20 text-green-400 text-xs px-4 py-1 rounded-full border border-green-500 shadow-[0_0_10px_green]">
          🟢 Available for work
        </span>
      </div>

      <h2 className="text-3xl font-bold mt-4 text-center tracking-wide relative z-10">
        {profile.name}
      </h2>

      <p className="text-cyan-400 text-sm mt-1 text-center relative z-10">
        {profile.role}
      </p>

      <dl className="mt-6 space-y-2 text-sm text-gray-300 relative z-10">
        {info.map((row) => (
          <div key={row.label} className="flex gap-2">
            <dt className="text-gray-400">{row.label}:</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-col gap-3 relative z-10">
        <Link
          to="/projects"
          className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-xl hover:scale-105 transition shadow-[0_0_25px_#22d3ee]"
        >
          View Projects
        </Link>

        <Link
          to="/contact"
          className="text-center border border-white/20 py-2 rounded-xl hover:border-cyan-400 hover:bg-white/5 transition"
        >
          Contact Me
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={profile.cvUrl}
            download
            className="text-center bg-white/10 py-2 rounded-xl border border-white/10 hover:border-cyan-400 hover:bg-white/5 transition text-sm"
          >
            Download CV
          </a>

          <button
            type="button"
            onClick={onViewCV}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 py-2 rounded-xl hover:scale-105 transition text-sm"
          >
            View CV
          </button>
        </div>
      </div>
    </motion.aside>
  )
}