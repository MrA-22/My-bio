import { useEffect, useMemo } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Background({ particleCount = 20 }) {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX - 144)
      y.set(e.clientY - 144)
    }
    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [x, y])

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 2 + Math.random() * 3,
      })),
    [particleCount]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-25 bg-cyan-400"
        style={{ x: springX, y: springY }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-pulse"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-10 right-10 animate-pulse" />
    </div>
  )
}