import { useState } from "react"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import Background from "../components/ui/Background"
import AnimatedText from "../components/ui/AnimatedText"
import useDocumentTitle from "../hooks/useDocumentTitle"
import { profile } from "../data/profile"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_mr4"
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_diwbyo2"
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "XY0qy8JKTPjFN75-e"

const initialForm = { name: "", email: "", message: "" }

const fieldClass =
  "w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 outline-none text-sm transition disabled:opacity-60"

const statusMessages = {
  success: { text: "Pesan berhasil terkirim. Terima kasih!", className: "text-green-400" },
  error: { text: "Pesan gagal terkirim. Coba lagi atau hubungi lewat WhatsApp.", className: "text-red-400" },
}

export default function Contact() {
  useDocumentTitle("Contact")
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState("idle")

  const sending = status === "sending"

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (status === "success" || status === "error") setStatus("idle")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setStatus("sending")

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
        PUBLIC_KEY
      )
      setForm(initialForm)
      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  const feedback = statusMessages[status]

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-28 pb-16 bg-black text-white">
      <Background particleCount={12} />

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              <AnimatedText text="Contact Me" />
            </h1>

            <p className="text-gray-400 mt-3 text-sm md:text-base">
              Jika kamu ingin bekerja sama atau berdiskusi, silakan hubungi saya.
            </p>
          </div>

          <div className="relative bg-black/40 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />

            <p className="relative">
              <span className="text-gray-400">Email:</span>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-cyan-300 hover:underline"
              >
                {profile.email}
              </a>
            </p>
            <p className="relative">
              <span className="text-gray-400">Location:</span> {profile.location}
            </p>
            <p className="relative">
              <span className="text-gray-400">Role:</span> Developer
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {profile.socials.map((social) => (
              <motion.a
                key={social.name}
                whileTap={{ scale: 0.95 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm bg-black/40 border border-white/10 rounded-lg hover:border-cyan-400 transition"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="relative bg-black/40 backdrop-blur-2xl p-5 md:p-8 rounded-2xl border border-cyan-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />

          <h2 className="relative text-xl md:text-2xl font-semibold mb-5 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <AnimatedText text="Send Message" />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="name" className="sr-only">
                Nama
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
                disabled={sending}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                autoComplete="email"
                required
                disabled={sending}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message..."
                required
                disabled={sending}
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Mengirim..." : "Send Message"}
            </button>

            <p role="status" aria-live="polite" className={`text-sm min-h-[1.25rem] ${feedback?.className ?? ""}`}>
              {feedback?.text}
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}