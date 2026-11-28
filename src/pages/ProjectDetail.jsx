import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { projectsData } from "../data/projects"
import LiveWebPreview from "../components/clones/LiveWebPreview"
import PhoneMockup from "../components/clones/PhoneMockup"
import KasirProClone from "../components/clones/KasirProClone"
import AnimatedText from "../components/ui/AnimatedText"
import useDocumentTitle from "../hooks/useDocumentTitle"

function Lightbox({ images, index, onClose, onChange }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onChange((index + 1) % images.length)
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [index, images.length, onClose, onChange])

  const image = images[index]

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Galeri screenshot"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/90 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition"
      >
        ✕
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={(e) => {
              e.stopPropagation()
              onChange((index - 1 + images.length) % images.length)
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full transition"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Berikutnya"
            onClick={(e) => {
              e.stopPropagation()
              onChange((index + 1) % images.length)
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full transition"
          >
            ›
          </button>
        </>
      )}

      <img
        src={image.url}
        alt={image.desc || "Screenshot"}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] max-w-full rounded-xl object-contain"
      />

      <p className="text-sm text-gray-300 text-center">
        {image.desc} {images.length > 1 && `(${index + 1}/${images.length})`}
      </p>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const projectIndex = projectsData.findIndex((item) => item.id === id)
  const project = projectsData[projectIndex]

  useDocumentTitle(project?.name)

  const [failed, setFailed] = useState({})
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const markFailed = (url) => setFailed((prev) => ({ ...prev, [url]: true }))

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4 px-6">
        <p className="text-lg text-gray-300">Project not found</p>
        <Link
          to="/projects"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-cyan-300 transition"
        >
          ← Kembali ke Projects
        </Link>
      </div>
    )
  }

  const images = (project.images || []).filter((img) => !failed[img.url])
  const videos = (project.videos || []).filter((vid) => !failed[vid.url])
  const total = projectsData.length
  const prevProject = projectsData[(projectIndex - 1 + total) % total]
  const nextProject = projectsData[(projectIndex + 1) % total]

  return (
    <div className="min-h-screen px-6 pt-28 pb-20 max-w-5xl mx-auto text-white space-y-10">
      <div>
        <Link
          to="/projects"
          className="inline-block text-sm text-gray-400 hover:text-cyan-400 transition"
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          <AnimatedText text={project.name} />
        </h1>

        <div className="flex flex-wrap gap-2">
          {project.badge && (
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300">
              {project.badge}
            </span>
          )}

          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-gray-400 leading-relaxed">{project.desc}</p>

        {(project.botNumber || project.apkUrl) && (
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {project.botNumber && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${project.botNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Try My Bot
              </motion.a>
            )}

            {project.apkUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.apkUrl}
                download
                className="inline-block px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-cyan-400/40 text-cyan-300 text-sm font-semibold transition"
              >
                ⬇ Download APK
              </motion.a>
            )}
          </div>
        )}
      </div>

      {(project.demoUrl || (project.demos && project.demos.length > 0)) && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
            🌐 Live Demo
          </h2>
          <LiveWebPreview
            url={project.demoUrl}
            demos={project.demos}
            title={project.name}
            defaultView={project.defaultView || "desktop"}
          />
        </div>
      )}

      {project.uiClone === "kasir-pro" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
            📱 Interactive Android Demo
          </h2>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <div className="space-y-3">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                Android POS Flow Simulation
              </span>
              <h3 className="text-2xl font-bold text-white">
                {project.name} — Mobile View
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Simulasi interaktif alur kasir, kelola produk, hitung kembalian tunai/QRIS, struk digital, dan laporan transaksi langsung dari browser.
              </p>
            </div>

            <PhoneMockup label={`${project.name} • Android View`}>
              <KasirProClone />
            </PhoneMockup>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
            🖼️ Screenshots
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <motion.button
                key={img.url}
                type="button"
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group text-left bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:border-cyan-400/40 transition"
              >
                <img
                  src={img.url}
                  alt={img.desc || `${project.name} screenshot ${i + 1}`}
                  loading="lazy"
                  onError={() => markFailed(img.url)}
                  className="w-full h-56 object-cover group-hover:scale-[1.03] transition duration-500"
                />

                {img.desc && (
                  <p className="p-3 text-xs text-gray-400 text-center">{img.desc}</p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {videos.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
            🎥 Demo Video
          </h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
            {videos.map((vid) => (
              <motion.div
                key={vid.url}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)]"
              >
                <video
                  src={vid.url}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => markFailed(vid.url)}
                  className="w-full aspect-video object-cover"
                />

                {vid.desc && (
                  <p className="p-3 text-sm text-gray-400 text-center">{vid.desc}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
        <Link
          to={`/projects/${prevProject.id}`}
          className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition"
        >
          <span className="text-xs text-gray-500">← Sebelumnya</span>
          <p className="text-cyan-300 font-semibold group-hover:text-cyan-200">
            {prevProject.name}
          </p>
        </Link>

        <Link
          to={`/projects/${nextProject.id}`}
          className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition sm:text-right"
        >
          <span className="text-xs text-gray-500">Berikutnya →</span>
          <p className="text-cyan-300 font-semibold group-hover:text-cyan-200">
            {nextProject.name}
          </p>
        </Link>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  )
}