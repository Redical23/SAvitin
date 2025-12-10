"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

export default function HeroSection() {
  const router = useRouter()

  const backgroundImages = ["/bmw1.jpg", "/bmw2.jpg", "/bmw3.jpg"]
  const [bgIndex, setBgIndex] = useState(0)
  const [query, setQuery] = useState("")

  const { ref, isVisible, parallaxOffset } = useScrollAnimation({ threshold: 0.3 })

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // 🚀 NEW → Search Page Navigation
  const handleSearchClick = () => {
    if (!query.trim()) return
    router.push(`/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden 
      bg-gradient-to-b from-slate-950 to-slate-900"
    >
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-[1500ms] 
            ${bgIndex === index ? "opacity-20" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-3xl px-6 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 40}px)`,
          transition: "all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6 animate-antigravity-float">
          Find Nearby <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Places & Things
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl mb-10">
          Discover the best hotels, cars, restaurants and services near you — all in one place.
        </p>

        {/* SEARCH BAR */}
        <div
          className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-slate-700/60 
          rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-blue-500/10"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for hotels, cars, restaurants..."
            className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-400"
          />

          <button
            onClick={handleSearchClick}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 
            text-white font-semibold hover:scale-110 transition-transform shadow-lg
            hover:shadow-cyan-500/40"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  )
}
