import { useParams } from "react-router-dom"
import { useState } from "react"

export default function ProjectDetail() {
    const { id } = useParams()
    const [currentIndex, setCurrentIndex] = useState(0)

    const projects = {
        "whatsapp-bot": {
            name: "WhatsApp Bot",
            desc: "Bot WhatsApp dengan berbagai fitur seperti downloader, game, dan AI.",
            botNumber: "6287894991151",
            images: [
                { url: "/images/Wabot/menu.jpeg", desc: "Tampilan menu utama bot" },
                { url: "/images/Wabot/allmenu.jpeg", desc: "Tampilan semua Fitur bot" },
                { url: "/images/Wabot/tutorial.jpeg", desc: "Fitur tutorial bot" },
                { url: "/images/Wabot/downloader.jpeg", desc: "Fitur downloader" },
            ]
        },

        "web-store": {
            name: "Web Store",
            desc: "Website e-commerce untuk jual beli produk online.",
            images: [
                { url: "/images/store1.jpg", desc: "Landing page toko" }
            ]
        },

        "web-sis": {
            name: "Web SIS",
            desc: "Sistem Informasi Sekolah untuk manajemen data siswa.",
            images: [
                { url: "/images/sis1.jpg", desc: "Dashboard admin siswa" }
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
                { url: "/images/vr1.jpg", desc: "Tampilan desain dalam VR" }
            ]
        }
    }

    const project = projects[id]

    if (!project) return <div>Project not found</div>

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

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold text-blue-400">
                {project.name}
            </h1>

            <p className="text-gray-400 mt-4">
                {project.desc}
            </p>

            {project.botNumber && (
                <div className="mt-2">
                    <a
                        href={`https://wa.me/${project.botNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline font-semibold"
                    >
                        Chat Bot WhatsApp
                    </a>
                </div>
            )}
            {/* Image Slider */}
            {images.length > 0 && (
                <div className="mt-10">
                    <div className="relative w-full aspect-[3/2] bg-black flex items-center justify-center">
                        <img
                            src={images[currentIndex].url}
                            alt="project"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />


                        {/* Prev */}
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded"
                        >
                            Prev
                        </button>

                        {/* Next */}
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded"
                        >
                            Next
                        </button>
                    </div>

                    {/* Deskripsi gambar */}
                    <p className="text-center text-gray-400 mt-3">
                        {images[currentIndex].desc}
                    </p>

                    {/* Indicator */}
                    <div className="flex justify-center mt-2 gap-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-blue-400" : "bg-gray-600"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}