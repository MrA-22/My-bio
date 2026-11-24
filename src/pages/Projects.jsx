import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { projectsData } from "../data/projects"

export default function Projects() {
  const [query, setQuery] = useState("")

  const filtered = projectsData.filter((p) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    )
  })

  const webs = filtered.filter((p) => p.section === "web")
  const games = filtered.filter((p) => p.section === "game")

  // PAGE TRANSITION (lebih smooth)
  const pageVariants = {
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -40, filter: "blur(8px)" },
  }

  const pageTransition = {
    duration: 0.45,
    ease: "easeInOut",
  }

  // STAGGER
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const Card = ({ p }) => (
    <motion.div variants={cardVariants}>
      <Link to={`/projects/${p.id}`}>
        <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:scale-[1.03] transition duration-300 cursor-pointer h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold text-cyan-400">
                {p.name}
              </h2>
              {p.demoUrl && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 shrink-0">
                  Live Demo
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-2 text-sm">
              {p.desc}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen max-w-6xl mx-auto px-6 py-20 space-y-16 text-white"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-gray-400">
          Collection of my work in Game Development and Web Development
        </p>

        {/* Search ringan */}
        <div className="max-w-md mx-auto pt-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari project..."
            className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60"
          />
        </div>
      </motion.div>

      {/* WEB */}
      {webs.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400 border-b border-white/10 pb-2">
            🌐 Web Projects
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-6"
          >
            {webs.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </motion.div>
        </div>
      )}

      {/* GAME */}
      {games.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-purple-400 border-b border-white/10 pb-2">
            🎮 Game Projects
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-6"
          >
            {games.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </motion.div>
        </div>
      )}

      {/* JIKA PENCARIAN KOSONG */}
      {webs.length === 0 && games.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-black/30 rounded-2xl border border-white/10">
          Project &ldquo;{query}&rdquo; tidak ditemukan.
        </div>
      )}

    </motion.div>
  )
}