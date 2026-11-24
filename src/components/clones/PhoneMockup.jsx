import { useState, useEffect } from "react"

export default function PhoneMockup({ children, label = "Android Live Clone" }) {
    const [time, setTime] = useState("")

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Bezel Android */}
            <div className="relative w-[330px] h-[680px] bg-zinc-900 rounded-[44px] p-3 border-[3px] border-zinc-700 shadow-[0_0_50px_rgba(34,211,238,0.18)]">
                {/* Tombol fisik samping */}
                <div className="absolute -right-[6px] top-28 w-[3px] h-12 bg-zinc-600 rounded-r" />
                <div className="absolute -right-[6px] top-44 w-[3px] h-16 bg-zinc-600 rounded-r" />

                {/* Layar */}
                <div className="relative w-full h-full bg-zinc-950 rounded-[34px] overflow-hidden flex flex-col border border-white/10">
                    {/* Status Bar + Punch Hole */}
                    <div className="h-8 px-5 flex items-center justify-between text-[11px] text-zinc-300 select-none shrink-0 bg-zinc-950/90 z-20">
                        <span>{time || "09:41"}</span>
                        <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-700" />
                        <div className="flex items-center gap-1.5">
                            <span>LTE</span>
                            <div className="w-4 h-2.5 border border-zinc-300 rounded-[2px] p-[1px]">
                                <div className="w-full h-full bg-emerald-400" />
                            </div>
                        </div>
                    </div>

                    {/* Area Konten Clone (Scrollable) */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        {children}
                    </div>

                    {/* Gesture Bar Bawah */}
                    <div className="h-6 flex items-center justify-center shrink-0 bg-zinc-950">
                        <div className="w-28 h-1 bg-zinc-600 rounded-full" />
                    </div>
                </div>
            </div>

            <span className="mt-3 text-xs text-gray-400">{label}</span>
        </div>
    )
}