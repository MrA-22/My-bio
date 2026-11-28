import { profile } from "../../data/profile"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          {profile.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}