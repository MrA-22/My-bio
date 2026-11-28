import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function CVModal({ open, onClose, url }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Preview CV"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 text-sm">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 transition"
              >
                Buka di tab baru ↗
              </a>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup preview CV"
                className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            <iframe src={url} className="w-full flex-1" title="CV Preview" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}