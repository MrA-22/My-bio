import { motion } from "framer-motion"

const letterVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.03, duration: 0.4 },
  }),
}

export default function AnimatedText({ text }) {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariant}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}