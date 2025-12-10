"use client"

import { Car, Bed, Utensils, Gift } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

// ✅ NEW — data imported from categorized data.js
import { listings, eventListing } from "../data/data"

function EventBanner({ list, isVisible, isScrollingDown }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return
    const diff = e.touches[0].clientX - touchStartX.current
    if (diff > 50) {
      setIndex((prev) => (prev === 0 ? list.items.length - 1 : prev - 1))
      touchStartX.current = null
    } else if (diff < -50) {
      setIndex((prev) => (prev + 1) % list.items.length)
      touchStartX.current = null
    }
  }

  return (
    <div
      className={`relative w-full h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform duration-700 group cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        transform: isVisible ? "translateX(0)" : isScrollingDown ? `translateX(-80px)` : `translateX(80px)`,
        transitionDelay: isVisible ? "300ms" : "0ms",
      }}
    >
      <img
        key={index}
        src={list.items[index].img || "/placeholder.svg"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-fade"
        alt={list.items[index].name}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${list.color} text-white backdrop-blur-sm`}>
            <Gift size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">{list.title}</h3>
        </div>
        <h4 className="font-semibold text-white text-xl mb-1">{list.items[index].name}</h4>
        <p className="text-slate-200">{list.items[index].location}</p>
      </div>
    </div>
  )
}

function SwipeCard({ list, isVisible, isScrollingDown, idx }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return

    const diff = e.touches[0].clientX - touchStartX.current

    if (diff > 50) {
      setIndex((prev) => (prev === 0 ? list.items.length - 1 : prev - 1))
      touchStartX.current = null
    } else if (diff < -50) {
      setIndex((prev) => (prev + 1) % list.items.length)
      touchStartX.current = null
    }
  }

  return (
    <div
      className={`bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/20 transition-all transform duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        transform: isVisible ? "translateX(0)" : isScrollingDown ? `translateX(-80px)` : `translateX(80px)`,
        transitionDelay: isVisible ? `${idx * 100}ms` : "0ms",
      }}
    >
      <Header list={list} />

      <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          key={index}
          src={list.items[index].img || "/placeholder.svg"}
          className="w-full h-full object-cover rounded-xl animate-fade"
        />
      </div>

      <h4 className="font-semibold text-white text-lg">{list.items[index].name}</h4>
      <p className="text-slate-400">{list.items[index].location}</p>
    </div>
  )
}

function Header({ list }) {
  const Icon = list.icon
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${list.color} text-white`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-semibold text-white">{list.title}</h3>
    </div>
  )
}

export default function ListingGrid() {
  const router = useRouter()
  const { ref, isVisible, isScrollingDown } = useScrollAnimation({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      id="listing-section"
      className="relative w-full py-16 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2
          className={`text-4xl md:text-5xl font-bold text-white text-center mb-12 transform transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: isVisible
              ? "translateX(0) opacity-1"
              : isScrollingDown
              ? "translateX(-100px) opacity-0"
              : "translateX(100px) opacity-0",
          }}
        >
          Browse Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((list, idx) => (
            <div key={list.id}>
              <SwipeCard list={list} isVisible={isVisible} isScrollingDown={isScrollingDown} idx={idx} />

              <div
                className={`mt-4 text-center transform transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${idx * 100 + 50}ms` : "0ms" }}
              >
                <button
                  onClick={() => router.push(`/services/${list.id}`)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  View More {list.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EVENT LISTING USING IMPORTED DATA */}
        <div className="mt-8">
          <EventBanner list={eventListing} isVisible={isVisible} isScrollingDown={isScrollingDown} />

          <div
            className={`mt-4 text-center transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? `350ms` : "0ms" }}
          >
            <button
              onClick={() => router.push(`/services/${eventListing.id}`)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              View More {eventListing.title}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
        .animate-fade {
          animation: fadeAnim .6s ease;
        }
        @keyframes fadeAnim {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
      `}
      </style>
    </section>
  )
}
