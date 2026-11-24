import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { projectsData } from "../data/projects"
import LiveWebPreview from "../components/clones/LiveWebPreview"

export default function ProjectDetail() {
    const { id } = useParams()

    const project = projectsData.find((item) => item.id === id)
    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4 px-6">
                <p className="text-lg text-gray-300">Project not found</p>
                <Link
                    to="/projects"
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-cyan-300 transition"
                >
                    ← Kembali ke Projects
                </Link>
            </div>
        )
    }

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
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen px-6 pt-28 pb-20 max-w-5xl mx-auto text-white space-y-10"
        >
            {/* NAV BACK */}
            <div>
                <Link
                    to="/projects"
                    className="inline-block text-sm text-gray-400 hover:text-cyan-400 transition"
                >
                    ← Back to Projects
                </Link>
            </div>

            {/* HEADER */}
            <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    <AnimatedText text={project.name} />
                </h1>

                {project.badge && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300">
                        {project.badge}
                    </span>
                )}

                <p className="text-gray-400 leading-relaxed">
                    {project.desc}
                </p>

                {project.botNumber && (
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/${project.botNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                        Try My Bot
                    </motion.a>
                )}
            </div>

            {/* 🌐 LIVE DEMO INTERAKTIF */}
            {project.demoUrl && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
                        🌐 Live Demo
                    </h2>
                    <LiveWebPreview url={project.demoUrl} title={project.name} />
                </div>
            )}

            {/* 🎥 DEMO VIDEO (JIKA ADA) */}
            {project.videos && project.videos.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
                        🎥 Demo Video
                    </h2>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
                        {project.videos.map((vid, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                            >
                                <video
                                    src={vid.url}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full aspect-video object-cover"
                                />

                                {vid.desc && (
                                    <p className="p-3 text-sm text-gray-400 text-center">
                                        {vid.desc}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    )
}