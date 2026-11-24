import { useState } from "react"

export default function AppetizePreview({ url, title = "Android App Demo" }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="space-y-4">
      {/* Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
        <span className="text-xs text-gray-300">
          Klik <span className="text-cyan-400 font-semibold">Tap to Play</span> pada layar emulator untuk menjalankan aplikasi
        </span>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 transition"
        >
          Buka Fullscreen ↗
        </a>
      </div>

      {/* Container Emulator Appetize */}
      <div className="relative w-full flex justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(34,211,238,0.15)]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-cyan-400">
            Menyiapkan emulator Android...
          </div>
        )}

        <iframe
          src={url}
          title={title}
          onLoad={() => setIsLoading(false)}
          width="380"
          height="780"
          frameBorder="0"
          scrolling="no"
          allow="clipboard-read; clipboard-write"
          className="max-w-full rounded-xl"
        />
      </div>
    </div>
  )
}