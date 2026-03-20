import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs.send(
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

  return (
    <section className="min-h-screen px-6 py-20 flex items-center">

      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT - INFO */}
        <div className="space-y-6">

          <div>
            <h1 className="text-4xl font-bold text-blue-400">
              Contact Me
            </h1>
            <p className="text-gray-400 mt-3">
              Jika kamu ingin bekerja sama, bertanya, atau sekadar berdiskusi seputar game development maupun web development, silakan hubungi saya.
            </p>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 space-y-3">
            <p><span className="text-gray-400">Email:</span> ariflgln@email.com</p>
            <p><span className="text-gray-400">Location:</span> Indonesia</p>
            <p><span className="text-gray-400">Role:</span> Game & Web Developer</p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4">
            <a href="https://github.com/MrA-22" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition">
              GitHub
            </a>
            <a href="https://www.facebook.com/Ruang.saya1/?viewas=100000686899395" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition">
              Facebook
            </a>
            <a href="https://www.instagram.com/bear_bucin?igsh=MW41a291dmJqcGdxOA==" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition">
              Instagram
            </a>
          </div>

        </div>

        {/* RIGHT - FORM */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl">

          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  )
}