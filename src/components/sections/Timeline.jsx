import Reveal from "../ui/Reveal"

const accents = {
  cyan: {
    heading: "text-cyan-400",
    border: "border-cyan-500",
    dot: "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
    label: "text-cyan-300",
  },
  purple: {
    heading: "text-purple-400",
    border: "border-purple-500",
    dot: "bg-purple-500 shadow-[0_0_10px_#a855f7]",
    label: "text-purple-300",
  },
}

export default function Timeline({ title, items, accent = "cyan" }) {
  const style = accents[accent]

  return (
    <Reveal className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
      <h2 className={`${style.heading} mb-6 uppercase tracking-widest text-sm`}>
        {title}
      </h2>

      <ol className="space-y-6">
        {items.map((item) => (
          <li
            key={item.label}
            className={`relative border-l-2 pl-5 ${style.border}`}
          >
            <span
              className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ${style.dot}`}
            />
            <p className={`font-bold ${style.label}`}>{item.label}</p>
            {item.title && (
              <p className="text-white font-semibold">{item.title}</p>
            )}
            {item.subtitle && (
              <p className="text-gray-400 text-sm">{item.subtitle}</p>
            )}
            {item.text && (
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                {item.text}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  )
}