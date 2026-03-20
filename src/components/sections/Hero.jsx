import { useNavigate, Link } from "react-router-dom"
import profileImg from "../../assets/profile.jpg"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { useEffect, useState } from "react"

export default function Hero() {
  const navigate = useNavigate()

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Cursor glow follow mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Floating particles
  const particles = Array.from({ length: 25 })

  const skills = [
    { name: "C#", level: 80 },
    { name: "Unity Engine", level: 75 },
    { name: "Gameplay Systems", level: 80 },
    { name: "JavaScript", level: 65 },
    { name: "React", level: 60 },
    { name: "Tailwind CSS", level: 60 },
    { name: "HTML", level: 85 },
    { name: "CSS", level: 85 },
    { name: "Node.js", level: 65 },
    { name: "Python", level: 75 },
    { name: "API Integration", level: 70 },
  ]

  const timeline = [
    { year: "2021", text: "Mulai belajar coding" },
    { year: "2023", text: "Explore web & game system, membuat WA-bot" },
    { year: "2026", text: "Fokus ke Game Development" },
  ]

  const education = [
    {
      year: "2021 - Sekarang",
      school: "Universitas Muhammadiyah Parepare",
      major: "Informatika / Teknik Komputer",
      desc: "Mempelajari dasar pemrograman, struktur data, software engineering, serta pengembangan aplikasi web dan game.",
    },
    {
      year: "2018 - 2021",
      school: "Sekolah Menengah Atas",
      major: "Jurusan MIPA",
      desc: "mulai tertarikan dalam pengembangan game dan sistem digital.",
    },
  ]

  const projects = [
    {
      id: "vr-home-design",
      title: "VR Home Design",
      description:
        "Aplikasi game berbasis virtual reality yang memungkinkan pengguna memvisualisasikan desain interior rumah secara interaktif.",
    },
  ]

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black text-white relative overflow-hidden">

      {/* 🌌 Cursor Glow */}
      <div
        className="pointer-events-none fixed w-72 h-72 rounded-full blur-3xl opacity-30 bg-cyan-400"
        style={{
          left: mouse.x - 150,
          top: mouse.y - 150,
        }}
      />

      {/* 🌌 Floating Particles */}
      {particles.map((_, i) => (
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl w-full grid lg:grid-cols-3 gap-10 z-10"
      >

        {/* PROFILE (DEPTH + GLASS + NEON) */}
        <motion.div
          variants={item}
          whileHover={{ rotateY: 10, rotateX: 8, scale: 1.04 }}
          className="lg:col-span-1 relative bg-black/40 backdrop-blur-2xl p-6 rounded-3xl border border-cyan-500/20 shadow-[0_0_60px_rgba(34,211,238,0.2)] transition-transform duration-300"
        >
          {/* Depth layer highlight */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

          <div className="flex justify-center relative z-10">
            <img
              src={profileImg}
              alt="profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_40px_#22d3ee] hover:scale-110 transition"
            />
          </div>

          <div className="mt-4 text-center relative z-10">
            <span className="bg-green-500/20 text-green-400 text-xs px-4 py-1 rounded-full border border-green-500 shadow-[0_0_10px_green]">
              🟢 Available for work
            </span>
          </div>

          <h1 className="text-3xl font-bold mt-4 text-center tracking-wide relative z-10">
            Arif Rasyid
          </h1>

          <p className="text-cyan-400 text-sm mt-1 text-center relative z-10">
            Game & Web Developer
          </p>

          <div className="mt-6 text-left space-y-2 text-sm text-gray-300 relative z-10">
            <p><span className="text-gray-400">Role:</span> Developer</p>
            <p><span className="text-gray-400">Focus:</span> Game & Web Systems</p>
            <p><span className="text-gray-400">Location:</span> Indonesia</p>
            <p><span className="text-gray-400">Status:</span> Student / Developer</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 relative z-10">
            <button
              onClick={() => navigate("/projects")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-xl hover:scale-105 transition shadow-[0_0_25px_#22d3ee]"
            >
              View Projects
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-white/20 py-2 rounded-xl hover:border-cyan-400 hover:bg-white/5 transition"
            >
              Contact Me
            </button>

            <a
              href="/document/ArifResume.pdf"
              download
              className="bg-white/10 py-2 rounded-xl border border-white/10 hover:border-cyan-400 text-center transition hover:bg-white/5"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        {/* CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* INTRO */}
          <motion.div variants={item}>
            <p className="text-cyan-400 mb-3 tracking-widest uppercase text-xs">
              👋 Welcome to my digital space
            </p>

            <TypeAnimation
              sequence={[
                "Game Developer 🎮",
                1500,
                "Web Developer 🌐",
                1500,
                "VR Enthusiast 🥽",
                1500,
                "Problem Solver ⚡",
                1500,
              ]}
              speed={50}
              repeat={Infinity}
              className="text-lg md:text-xl text-gray-300 mt-2"
            />
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Arif Rasyid
            </h1>

            <p className="text-gray-300 mt-6 leading-relaxed text-base md:text-lg">
              Perjalanan saya di dunia teknologi berawal dari rasa penasaran sejak masa SMA tentang bagaimana sebuah ide dapat diwujudkan menjadi aplikasi dan game interaktif. Dari sana, saya berkembang menjadi developer yang tidak hanya fokus pada kode, tetapi juga pada{" "}
              <span className="text-cyan-400 font-semibold">experience</span> dan{" "}
              <span className="text-purple-400 font-semibold">impact</span>.
            </p>

            <p className="text-gray-300 mt-4 leading-relaxed text-base md:text-lg">
              Saya membangun solusi sebagai{" "}
              <span className="text-cyan-400 font-semibold">Game Developer</span> dan{" "}
              <span className="text-purple-400 font-semibold">Web Developer</span>, dengan fokus pada arsitektur sistem yang rapi, scalable, dan user-centered. Dalam game development, saya menggunakan{" "}
              <span className="text-cyan-400 font-semibold">C# & Unity</span>, serta mengeksplorasi{" "}
              <span className="text-cyan-400 font-semibold">Virtual Reality (VR)</span> dan{" "}
              <span className="text-cyan-400 font-semibold">Unreal Engine</span> untuk membangun pengalaman 3D yang lebih imersif.
            </p>

            <p className="text-gray-300 mt-4 leading-relaxed text-base md:text-lg">
              Di sisi web, saya mengembangkan antarmuka modern menggunakan{" "}
              <span className="text-purple-400 font-semibold">React & Tailwind CSS</span>, didukung dengan{" "}
              <span className="text-purple-400 font-semibold">Node.js</span> dan{" "}
              <span className="text-purple-400 font-semibold">Python</span> untuk logic dan backend integration.
            </p>

            <p className="text-gray-300 mt-4 leading-relaxed text-base md:text-lg">
              Saat ini saya terus membangun berbagai proyek, mengeksplorasi teknologi baru, dan mengasah kemampuan untuk menciptakan solusi digital yang tidak hanya fungsional, tetapi juga memberikan pengalaman yang{" "}
              <span className="text-cyan-400 font-semibold">intuitif</span>,{" "}
              <span className="text-purple-400 font-semibold">immersive</span>, dan{" "}
              <span className="text-pink-400 font-semibold">memorable</span>.
            </p>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.01 }}
            className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10"
          >
            <h2 className="text-cyan-400 mb-4 uppercase tracking-widest text-sm">
              Skills Overview
            </h2>

            {skills.map((skill, i) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>

                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level + "%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_15px_#22d3ee]"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* EDUCATION */}
          <motion.div variants={item} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
            <h2 className="text-purple-400 mb-4 uppercase tracking-widest text-sm">
              Education
            </h2>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="mb-6 border-l-2 border-cyan-500 pl-4 relative"
              >
                <div className="absolute -left-[6px] top-2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                <p className="font-bold text-cyan-300">{edu.year}</p>
                <p className="text-white font-semibold">{edu.school}</p>
                <p className="text-gray-400 text-sm">{edu.major}</p>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  {edu.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* TIMELINE */}
          <motion.div variants={item} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
            <h2 className="text-purple-400 mb-4 uppercase tracking-widest text-sm">
              Journey
            </h2>

            {timeline.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="mb-5 border-l-2 border-purple-500 pl-4 relative"
              >
                <div className="absolute -left-[6px] top-2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
                <p className="font-bold text-purple-300">{t.year}</p>
                <p className="text-gray-400 text-sm">{t.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* PROJECT */}
          <div className="space-y-6">
            {projects.map((p) => (
              <Link to={`/projects/${p.id}`} key={p.id}>
                <motion.div
                  variants={item}
                  whileHover={{
                    scale: 1.04,
                    rotateX: 3,
                    rotateY: -3,
                  }}
                  className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition"
                >
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                    🚀 Featured Project
                  </h3>

                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                    <p className="font-semibold text-lg">{p.title}</p>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="mt-3 text-xs text-cyan-300">
                      Click to view details →
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  )
}