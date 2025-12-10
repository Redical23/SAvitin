"use client"

import { useState } from "react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { categories } from "../data/data"   // ✅ NEW

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState(null)
  const { ref, isVisible, parallaxOffset } = useScrollAnimation({ threshold: 0.2 })

  // ✅ Auto-load all images from categorized data
  const galleryImages = categories.flatMap(cat => cat.images)

  return (
    <section ref={ref} id="gallery" className="relative w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "smoothFadeInUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
          }}
        >
          Image <span className="text-cyan-400">Gallery</span>
        </h2>

        {/* Grid with Staggered Animations */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImg(img)}
              className="relative group cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                animation: isVisible
                  ? `smoothFadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 50}ms both`
                  : "none",
                transform: isVisible
                  ? `translateX(0) translateY(${parallaxOffset * 0.03}px) scale(1)`
                  : `translateX(-40px) scale(0.95)`,
                transitionDuration: isVisible ? "0s" : "0.5s",
              }}
            >
              <img
                src={img || "/placeholder.svg"}
                alt="Gallery"
                className="w-full h-48 md:h-56 rounded-xl object-cover 
                transform group-hover:scale-110 transition-all duration-500 
                shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/30"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg || "/placeholder.svg"}
            className="w-[90%] md:w-[60%] rounded-2xl shadow-2xl animate-smooth-fade-in-up"
          />
        </div>
      )}
    </section>
  )
}
