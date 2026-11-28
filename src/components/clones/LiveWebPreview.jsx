import { useState, useEffect } from "react"

export default function LiveWebPreview({
  url,
  demos = [],
  title = "Web Demo",
  defaultView = "desktop",
}) {
  // Normalisasi daftar demo agar mendukung `demos` array maupun `url` tunggal
  const demoList =
    demos.length > 0
      ? demos
      : url
      ? [{ label: title, url }]
      : []

  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState(defaultView) // "mobile" | "desktop"
  const [isLoading, setIsLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)
  const [time, setTime] = useState("")

  // Reset saat berpindah halaman project
  useEffect(() => {
    setActiveIndex(0)
    setViewMode(defaultView)
  }, [url, demos, defaultView])

  const currentDemo = demoList[activeIndex] || demoList[0]
  const currentUrl = currentDemo?.url || ""

  useEffect(() => {
    setIsLoading(true)
  }, [currentUrl, viewMode, reloadKey])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!currentUrl) return null

  return (
    <div className="space-y-4">
      {/* Tab Switcher jika 1 project memiliki lebih dari 1 Live Demo */}
      {demoList.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {demoList.map((item, idx) => (
            <button
              key={item.url}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                activeIndex === idx
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {item.label || `Demo ${idx + 1}`}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar Kontrol */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === "mobile"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            📱 Android View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("desktop")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === "desktop"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            💻 Desktop View
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            title="Muat ulang preview"
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition"
          >
            ↻ Reload
          </button>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 transition"
          >
            Buka di Tab Baru ↗
          </a>
        </div>
      </div>

      {/* Area Preview */}
      <div className="flex justify-center py-2">
        {viewMode === "mobile" ? (
          /* FRAME HP ANDROID */
          <div className="relative w-[360px] h-[720px] bg-zinc-900 rounded-[44px] p-3 border-[3px] border-zinc-700 shadow-[0_0_50px_rgba(34,211,238,0.18)]">
            <div className="absolute -right-[6px] top-28 w-[3px] h-12 bg-zinc-600 rounded-r" />
            <div className="absolute -right-[6px] top-44 w-[3px] h-16 bg-zinc-600 rounded-r" />

            <div className="relative w-full h-full bg-zinc-950 rounded-[34px] overflow-hidden flex flex-col border border-white/10">
              {/* Android Status Bar */}
              <div className="h-8 px-5 flex items-center justify-between text-[11px] text-zinc-300 select-none shrink-0 bg-zinc-950 z-20">
                <span>{time || "09:41"}</span>
                <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-700" />
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-4 h-2.5 border border-zinc-300 rounded-[2px] p-[1px]">
                    <div className="w-full h-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Live Website di dalam Layar Android */}
              <div className="relative flex-1 w-full bg-white">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-xs text-cyan-400 z-10">
                    Memuat {currentUrl}...
                  </div>
                )}
                <iframe
                  key={`${currentUrl}-mobile-${reloadKey}`}
                  src={currentUrl}
                  title={currentDemo?.label || title}
                  allow="camera; microphone; fullscreen; clipboard-write"
                  onLoad={() => setIsLoading(false)}
                  className="w-full h-full border-0"
                />
              </div>

              {/* Gesture Navigation Bar */}
              <div className="h-6 flex items-center justify-center shrink-0 bg-zinc-950">
                <div className="w-28 h-1 bg-zinc-600 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* FRAME BROWSER DESKTOP */
          <div className="w-full bg-zinc-900 rounded-2xl border border-white/15 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)]">
            <div className="h-10 px-4 bg-zinc-950 border-b border-white/10 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 bg-white/5 text-gray-400 text-xs px-3 py-1 rounded-md truncate">
                {currentUrl}
              </div>
            </div>

            <div className="relative w-full h-[600px] bg-white">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-xs text-cyan-400 z-10">
                  Memuat {currentUrl}...
                </div>
              )}
              <iframe
                key={`${currentUrl}-desktop-${reloadKey}`}
                src={currentUrl}
                title={currentDemo?.label || title}
                allow="camera; microphone; fullscreen; clipboard-write"
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}