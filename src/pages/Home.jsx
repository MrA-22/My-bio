import Hero from "../components/sections/Hero"
import useDocumentTitle from "../hooks/useDocumentTitle"

export default function Home() {
  useDocumentTitle()

  return <Hero />
}