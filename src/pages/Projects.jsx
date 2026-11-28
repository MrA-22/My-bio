import { useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { projectsData } from "../data/projects"
import useDocumentTitle from "../hooks/useDocumentTitle"

const tabs = [
  { key: "all", label: "Semua" },
  { key: "web", label: "Web" },
  { key: "game", label: "Game" },
]

function ProjectCard({ project }) {
  const [imgFailed, setImgFailed] = useState(false)
  const cover = project.cover || project.images?.[0]?.url
  const icon = project.section === "game" ? "🎮" : "🌐"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group block h-full bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 transition duration-300 overflow-hidden"
      >
        <div className="relative h-44 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 overflow-hidden">
          {cover && !imgFailed ? (
            <img
              src={cover}
              alt={project.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              {icon}
            </div>
          )}

          {project.demoUrl && (
            <span className="absolute top-3 right-3 text-[11px] px-2.5 py-0.5 rounded-full bg-black/70 border border-cyan-400/40 text-cyan-300">
              Live Demo
            </span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <h2 className="text-xl font-semibold text-cyan-400">{project.name}</h2>
          <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>

          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  useDocumentTitle("Projects")
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("all")

  const q = query.trim().toLowerCase()
  const filtered = projectsData.filter((p) => {
    const matchTab = tab === "all" || p.section === tab
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
    return matchTab && matchQuery
  })

  const countFor = (key) =>
    key === "all"
      ? projectsData.length
      : projectsData.filter((p) => p.section === key).length

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 pt-28 pb-20 space-y-12 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-gray-400">
          Collection of my work in Game Development and Web Development
        </p>

        <div className="max-w-md mx-auto pt-2">
          <label htmlFor="project-search" className="sr-only">
            Cari project
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari project atau teknologi..."
            className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60"
          />
        </div>

        <div className="flex justify-center gap-2 pt-2" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                tab === t.key
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {t.label} ({countFor(t.key)})
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-black/30 rounded-2xl border border-white/10">
          Project tidak ditemukan.{" "}
          <Link to="/contact" className="text-cyan-300 hover:underline">
            Hubungi saya
          </Link>{" "}
          jika ingin berdiskusi.
        </div>
      )}
    </div>
  )
}