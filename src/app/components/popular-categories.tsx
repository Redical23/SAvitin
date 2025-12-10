"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

// ✅ NEW — importing categorized data
import { categories } from "../data/data"

export default function PopularCategories() {
  const [selectedCategory, setSelectedCategory] = useState("Hotels")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const { ref, isVisible, parallaxOffset } = useScrollAnimation({ threshold: 0.2 })

  const selectedCat = categories.find((cat) => cat.id === selectedCategory)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % selectedCat.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + selectedCat.images.length) % selectedCat.images.length)
  }

  const handleSlideClick = (e) => {
    const x = e.nativeEvent.offsetX
    const width = e.currentTarget.clientWidth
    if (x < width / 2) prevImage()
    else nextImage()
  }

  const handleDoubleClick = () => {
    setModalOpen(true)
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
      id="category-section"
    >
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-glow-pulse-smooth"
          style={{
            opacity: isVisible ? 0.8 : 0,
            transform: `translateY(${parallaxOffset * 0.2}px) scale(${1 + parallaxOffset * 0.0003})`,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse-smooth"
          style={{
            opacity: isVisible ? 0.8 : 0,
            transform: `translateY(${parallaxOffset * -0.25}px) scale(${1 + parallaxOffset * 0.0004})`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            animation: isVisible
              ? "smoothFadeInUp 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards"
              : "none",
          }}
        >
          <h2 className="text-5xl font-light text-white mb-2">
            Popular{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-slate-400 text-lg tracking-wide">CHECK THEM OUT</p>
        </div>

        <div className="flex gap-10 flex-col lg:flex-row">

          {/* Left side category list */}
          <div className="w-full lg:w-1/3 flex flex-col gap-5">
            {categories.map((cat, idx) => {
              const Icon = cat.icon
              const isSelected = selectedCategory === cat.id

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setCurrentImage(0)
                  }}
                  className={`flex items-center gap-5 px-6 py-4 rounded-xl border transition-all text-left transform ${
                    isSelected
                      ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg scale-[1.03]`
                      : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/60 hover:translate-x-2"
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible
                      ? `smoothFadeInUp 0.8s cubic-bezier(0.34,1.56,0.64,1) ${idx * 100}ms both`
                      : "none",
                    transform: isVisible
                      ? `translateX(0) translateY(0)`
                      : `translateX(-40px) translateY(20px)`,
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      isSelected ? "bg-white/20 scale-110" : "bg-slate-700/40"
                    }`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="text-xl font-semibold">{cat.name}</span>
                </button>
              )
            })}
          </div>

          {/* Right side slideshow */}
          <div
            className="w-full lg:w-2/3 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-3xl p-4 text-white mt-8 lg:mt-0 flex flex-col gap-4 items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              animation: isVisible
                ? "smoothFadeInUp 0.9s cubic-bezier(0.34,1.56,0.64,1) 200ms both"
                : "none",
              transform: isVisible
                ? "translateX(0) scale(1)"
                : `translateX(40px) scale(0.95)`,
            }}
          >
            <h3 className="text-4xl font-semibold mb-2 text-center">
              Trending{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {selectedCat?.name}
              </span>
            </h3>

            <p className="text-slate-300 leading-relaxed mb-4 text-center">
              {selectedCat?.name} listings provide premium quality and verified options.
              Explore the best nearby places curated just for you.
            </p>

            {/* Image Slideshow */}
            <div
              className="relative w-full max-w-4xl h-96 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={handleSlideClick}
              onDoubleClick={handleDoubleClick}
            >
              <img
                src={selectedCat?.images[currentImage]}
                alt={selectedCat?.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/20"
            onClick={() => setModalOpen(false)}
          >
            <X size={28} />
          </button>

          <img
            src={selectedCat?.images[currentImage]}
            alt="Full Screen"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </section>
  )
}
