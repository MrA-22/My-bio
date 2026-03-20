import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Cursor glow follow mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send(
        "service_mr4",
        "template_diwbyo2",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "XY0qy8JKTPjFN75-e"
      )
      .then(() => {
        alert("Message sent successfully!")
        setForm({ name: "", email: "", message: "" })
      })
      .catch((error) => {
        console.error(error)
        alert("Failed to send message")
      })
  }

  // Page transition
  const container = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      filter: "blur(8px)",
      transition: { duration: 0.3 },
    },
  }

  // Letter animation
  const letterVariant = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.03,
        duration: 0.4,
      },
    }),
  }

  const AnimatedText = ({ text }) => {
    return (
      <span className="inline-block">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariant}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="min-h-screen px-6 py-20 flex items-center justify-center bg-black text-white relative overflow-hidden"
    >
      {/* 🌌 Cursor Glow */}
      <div
        className="pointer-events-none fixed w-72 h-72 rounded-full blur-3xl opacity-30 bg-cyan-400"
        style={{
          left: mouse.x - 150,
          top: mouse.y - 150,
        }}
      />

      {/* 🌌 Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full bottom-10 right-10 animate-pulse"></div>

      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-10 z-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              <AnimatedText text="Contact Me" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 mt-3"
            >
              Jika kamu ingin bekerja sama, bertanya, atau sekadar berdiskusi seputar game development maupun web development, silakan hubungi saya.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 space-y-3"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />

            <p><span className="text-gray-400">Email:</span> ariflgln@email.com</p>
            <p><span className="text-gray-400">Location:</span> Indonesia</p>
            <p><span className="text-gray-400">Role:</span> Game & Web Developer</p>
          </motion.div>

          <div className="flex gap-4">
            {["GitHub", "Facebook", "Instagram"].map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg hover:border-cyan-400 transition"
              >
                {item}
              </motion.a>
            ))}
          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative bg-black/40 backdrop-blur-2xl p-8 rounded-2xl border border-cyan-500/20"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />

          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <AnimatedText text="Send Message" />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 outline-none"
            />

            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 outline-none"
            />

            <motion.textarea
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message..."
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold shadow-[0_0_25px_#22d3ee]"
            >
              Send Message
            </motion.button>

          </form>

        </motion.div>

      </div>
    </motion.div>
  )
}