import { useParams } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectDetail() {
    const { id } = useParams()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const projects = {
        "whatsapp-bot": {
            name: "WhatsApp Bot",
            desc: "Bot WhatsApp dengan berbagai fitur seperti downloader, game, dan AI.",
            botNumber: "6287894991151",
            images: [
                { url: "/images/Wabot/menu.jpeg", desc: "Tampilan menu utama bot" },
                { url: "/images/Wabot/allmenu.jpeg", desc: "Tampilan semua fitur bot" },
                { url: "/images/Wabot/tutorial.jpeg", desc: "Fitur tutorial bot" },
                { url: "/images/Wabot/downloader.jpeg", desc: "Fitur downloader" }
            ]
        },

        "web-store": {
            name: "Web Store",
            desc: "Website e-commerce untuk jual beli produk online.",
            images: [
                { url: "/images/WebStore/admindashboard.png", desc: "Admin Dashboard" },
                { url: "/images/WebStore/dashboard.png", desc: "Landing page user" },
                { url: "/images/WebStore/cekout.png", desc: "Checkout page" },
                { url: "/images/WebStore/payment.png", desc: "Payment page" }
            ]
        },

        "web-sis": {
            name: "Web SIS",
            desc: "Sistem Informasi Sekolah untuk manajemen data siswa.",
            images: [
                { url: "/images/WebSIS/dashboard.png", desc: "Dashboard Sekolah" },
                { url: "/images/WebSIS/adminpanel.png", desc: "Admin panel" },
                { url: "/images/WebSIS/loginaprt.png", desc: "Login admin" },
                { url: "/images/WebSIS/profilguru.png", desc: "Profil guru" }
            ]
        },

        "pirate-osam": {
            name: "Pirate OSAM",
            desc: "Game bertema petualangan pirate dengan eksplorasi dunia.",
            images: [
                { url: "/images/pirate1.jpg", desc: "Gameplay dunia pirate" }
            ]
        },

        "vr-home-design": {
            name: "VR Home Design",
            desc: "Aplikasi VR untuk desain rumah interaktif.",
            images: [
                { url: "/images/VrHD/mainmenu.png", desc: "MainMenu VR Home Design" },
                { url: "/images/VrHD/Tutorial.png", desc: "Tutorial Scene VR Home Design" },
            ],
            videos: [
                {
                    url: "/videos/vr-demo.mp4",
                    desc: "Demo interaksi VR",
                }
            ]
        }
    }

    const project = projects[id]
    if (!project) return <div className="text-white p-10">Project not found</div>

    const images = project.images || []

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        )
    }

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        )
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
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen px-6 py-20 max-w-5xl mx-auto text-white space-y-10"
        >

            {/* HEADER */}
            <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    <AnimatedText text={project.name} />
                </h1>
                {id === "vr-home-design" && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300">
                        🥽 VR Project
                    </span>
                )}

                {id === "pirate-osam" && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300">
                        🎮 Unity 3D
                    </span>
                )}

                {id === "web-store" && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300">
                        🛒 Web Store
                    </span>
                )}

                {id === "web-sis" && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300">
                        🎓 Web Sistem Informasi Sekolah
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

            {/* GALLERY */}
            {images.length > 0 && (
                <div className="space-y-6">

                    {/* MAIN IMAGE */}
                    <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)]">

                        <div className="relative w-full aspect-[16/9] flex items-center justify-center">

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex].url}
                                    alt="project"
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setIsLightboxOpen(true)}
                                    className="max-h-full max-w-full object-contain rounded-lg cursor-zoom-in"
                                />
                            </AnimatePresence>

                        </div>

                        {/* NAV BUTTONS */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur px-3 py-2 rounded-lg"
                        >
                            ◀
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur px-3 py-2 rounded-lg"
                        >
                            ▶
                        </motion.button>

                    </div>

                    {/* DESCRIPTION */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center text-gray-400"
                        >
                            {images[currentIndex].desc}
                        </motion.p>
                    </AnimatePresence>

                    {/* THUMBNAILS */}
                    <div className="flex gap-3 justify-center flex-wrap">
                        {images.map((img, index) => (
                            <motion.img
                                key={index}
                                src={img.url}
                                onClick={() => setCurrentIndex(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-20 h-14 object-cover rounded-md cursor-pointer border transition
                ${index === currentIndex
                                        ? "border-cyan-400"
                                        : "border-white/10 opacity-60 hover:opacity-100"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{
                                width: `${((currentIndex + 1) / images.length) * 100}%`
                            }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                </div>
            )}

            {/* 🎥 DEMO VIDEO / GIF */}
            {project.videos && project.videos.length > 0 && (
                <div className="space-y-6">

                    <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">
                        🎥 Demo
                    </h2>

                    <div className="max-w-4xl mx-20 grid grid-cols-1 gap-6">
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

            {/* 🖼️ LIGHTBOX FULLSCREEN */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(false)}
                    >

                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex].url}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="max-h-[90%] max-w-[90%] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-5 right-5 text-white text-2xl bg-black/60 px-3 py-1 rounded-lg"
                        >
                            ✕
                        </button>

                        {/* NAV INSIDE LIGHTBOX */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage() }}
                            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-2 rounded-lg"
                        >
                            ◀
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage() }}
                            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-2 rounded-lg"
                        >
                            ▶
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    )
}