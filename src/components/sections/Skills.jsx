import { motion } from "framer-motion"
import Reveal from "../ui/Reveal"
import { skillGroups } from "../../data/profile"

export default function Skills() {
  return (
    <Reveal className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
      <h2 className="text-cyan-400 mb-6 uppercase tracking-widest text-sm">
        Skills Overview
      </h2>

      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              {group.title}
            </h3>

            <div className="space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>

                  <div
                    role="progressbar"
                    aria-label={skill.name}
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="w-full bg-gray-800 h-2 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_15px_#22d3ee]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}