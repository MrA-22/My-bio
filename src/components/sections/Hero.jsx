import { useState } from "react"
import { Link } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"
import Background from "../ui/Background"
import Reveal from "../ui/Reveal"
import ProfileCard from "./ProfileCard"
import Skills from "./Skills"
import Timeline from "./Timeline"
import CVModal from "./CVModal"
import { profile, education, timeline } from "../../data/profile"
import { projectsData } from "../../data/projects"

const typingSequence = profile.roles.flatMap((role) => [role, 1500])
const featuredProjects = projectsData.filter((p) => p.featured)

export default function Hero() {
  const [showCV, setShowCV] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 bg-black text-white">
      <Background particleCount={25} />

      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-3 gap-10">
        <ProfileCard onViewCV={() => setShowCV(true)} />

        <div className="lg:col-span-2 space-y-10">
          <Reveal>
            <p className="text-cyan-400 mb-3 tracking-widest uppercase text-xs">
              👋 Welcome to my digital space
            </p>

            <TypeAnimation
              sequence={typingSequence}
              speed={50}
              repeat={Infinity}
              className="block min-h-[1.75rem] text-lg md:text-xl text-gray-300 mt-2"
            />

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              {profile.name}
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
          </Reveal>

          <Skills />
          <Timeline title="Education" items={education} accent="cyan" />
          <Timeline title="Journey" items={timeline} accent="purple" />

          {featuredProjects.map((project) => (
            <Reveal key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="block bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 transition duration-300"
              >
                <h2 className="text-lg font-semibold mb-3 text-cyan-400">
                  🚀 Featured Project
                </h2>

                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <p className="font-semibold text-lg">{project.name}</p>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    {project.desc}
                  </p>

                  {project.tech.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 text-xs text-cyan-300">
                    Click to view details →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <CVModal
        open={showCV}
        onClose={() => setShowCV(false)}
        url={profile.cvUrl}
      />
    </section>
  )
}