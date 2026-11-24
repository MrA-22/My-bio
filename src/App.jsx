import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import ProjectDetail from "./pages/ProjectDetail"
export default function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  )
}