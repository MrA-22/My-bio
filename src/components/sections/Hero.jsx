import { useNavigate } from "react-router-dom"
import profileImg from "../../assets/profile.jpg"
import { motion } from "framer-motion"

export default function Hero() {
  const navigate = useNavigate()

  const skills = [
    { name: "C#", level: 80 },
    { name: "Unity Engine", level: 75 },
    { name: "Game Logic", level: 80 },
    { name: "JavaScript", level: 65 },
    { name: "React", level: 50 },
    { name: "Tailwind CSS", level: 50 },
    { name: "Node.js", level: 65 },
    { name: "API Integration", level: 70 },
  ]

  const timeline = [
    { year: "2021", text: "Mulai belajar coding" },
    { year: "2023", text: "Explore web & game system, membuat WA-bot" },
    { year: "2026", text: "Fokus ke Game Development" },
  ]

  return (
    <section className="justify-center min-h-screen flex items-center px-6 py-16 bg-gradient-to-b from-black via-gray-900 to-black text-white">

      <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-10">

        {/* LEFT PROFILE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-xl text-center"
        >

          {/* Glow Image */}
          <div className="flex justify-center relative">
            <img
              src={profileImg}
              alt="profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-[0_0_25px_#3b82f6] hover:scale-110 hover:rotate-2 transition duration-300"
            />
          </div>

          {/* Badge */}
          <div className="mt-3">
            <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500">
              🟢 Available for work
            </span>
          </div>

          <h1 className="text-2xl font-bold mt-4">
            Arif Rasyid
          </h1>

          <p className="text-blue-400 text-sm mt-1">
            Game & Web Developer
          </p>

          <div className="mt-6 text-left space-y-2 text-sm text-gray-300">
            <p><span className="text-gray-400">Role:</span> Developer</p>
            <p><span className="text-gray-400">Focus:</span> Game & Web Systems</p>
            <p><span className="text-gray-400">Location:</span> Indonesia</p>
            <p><span className="text-gray-400">Status:</span> Student / Developer</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => navigate("/projects")}
              className="bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition shadow-[0_0_15px_#3b82f6]"
            >
              View Projects
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-gray-600 py-2 rounded-lg hover:border-blue-400 transition"
            >
              Contact Me
            </button>

            {/* Download CV */}
            <a
              href="/cv.pdf"
              download
              className="bg-gray-800 py-2 rounded-lg border border-gray-600 hover:border-blue-400 text-center transition"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 mb-2">👋 Hello, I'm</p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Arif Rasyid
            </h1>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Saya adalah seorang <span className="text-blue-400 font-semibold">Game Developer</span> dan <span className="text-blue-400 font-semibold">Web Developer</span> yang fokus membangun aplikasi interaktif dan sistem modern.
            </p>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Menggunakan <span className="text-blue-400 font-semibold">C# & Unity</span> untuk game development, serta <span className="text-blue-400 font-semibold">React, Tailwind, Node.js</span> untuk web development.
            </p>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-6 text-blue-400">
              Skills
            </h2>

            {skills.map((skill, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded shadow-[0_0_10px_#3b82f6]"
                    style={{ width: skill.level + "%" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* TIMELINE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-6 text-blue-400">
              Journey
            </h2>

            {timeline.map((item, i) => (
              <div key={i} className="mb-4 border-l-2 border-blue-500 pl-4">
                <p className="font-bold">{item.year}</p>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            ))}
          </motion.div>

          {/* PROJECT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-400">
              Featured Project
            </h3>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="font-semibold">Game & Web System</p>
              <p className="text-gray-400 text-sm">
                Kombinasi project game berbasis Unity dan sistem web untuk dashboard, API, dan automation.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}