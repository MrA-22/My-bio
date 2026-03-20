import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Projects() {

  const games = [
    {
      id: "pirate-osam",
      name: "Pirate OSAM",
      desc: "Game sederhana dengan mekanisme misi serta pertarungan ringan",
      type: "game",
    },
    {
      id: "vr-home-design",
      name: "VR Home Design",
      desc: "Game virtual reality untuk visualisasi desain interior rumah",
      type: "game",
    },
  ]

  const webs = [
    {
      id: "whatsapp-bot",
      name: "WhatsApp Bot",
      desc: "BOT WhatsApp with many feature",
      type: "web",
    },
    {
      id: "web-store",
      name: "Web Store",
      desc: "Web penjualan sederhana",
      type: "web",
    },
    {
      id: "web-sis",
      name: "Web SIS",
      desc: "Web Sistem Informasi Sekolah",
      type: "web",
    },
  ]

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
        <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:scale-[1.03] transition duration-300 cursor-pointer">
          <h2 className="text-xl font-semibold text-cyan-400">
            {p.name}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {p.desc}
          </p>
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
      className="min-h-screen max-w-6xl mx-auto px-6 py-20 space-y-20 text-white"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-gray-400">
          Collection of my work in Game Development and Web Development
        </p>
      </motion.div>

      {/* WEB */}
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

      {/* GAME */}
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

    </motion.div>
  )
}