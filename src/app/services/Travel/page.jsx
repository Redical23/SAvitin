"use client"

import DynamicHeader from "../../components/dynamic-header"
import Footer from "../../components/footer"
import { Car, MapPin, Star, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollAnimation } from "../../hooks/use-scroll-animation"

// ✅ NEW — Import data from separate file
import { travelListings } from "../../data/travel"

function CarCard({ car, isVisible, idx }) {
  return (
    <div
      className={`bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-teal-500/20 transition-all transform duration-700 group cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: isVisible ? `${idx * 50}ms` : "0ms",
      }}
    >
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={car.img || "/placeholder.svg"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={car.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-teal-500/20 px-3 py-1 rounded-full">
            <Star size={16} className="text-teal-400 fill-teal-400" />
            <span className="text-teal-300 font-semibold text-sm">{car.rating}</span>
          </div>
          <span className="text-slate-400 text-sm">({car.reviews} bookings)</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
          {car.name}
        </h3>

        <p className="text-teal-300 text-sm font-medium mb-3">{car.type}</p>

        <p className="text-slate-300 text-sm mb-4">{car.description}</p>

        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <MapPin size={16} className="text-teal-400" />
          <span className="text-sm">{car.location}</span>
        </div>

        <button className="w-full px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default function TravelPage() {
  const router = useRouter()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <>
      <DynamicHeader />

      <section className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden py-12">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-800 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} className="text-slate-400 hover:text-white transition-colors" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-teal-500 text-white">
                <Car size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Travel</h1>
            </div>
          </div>

          <p className="text-slate-300 text-lg mb-12">Book premium vehicles for your next journey</p>

          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelListings.map((car, idx) => (
              <CarCard key={car.id} car={car} isVisible={isVisible} idx={idx} />
            ))}
          </div>
        </div>

        <style>
          {`
          .animate-fade {
            animation: fadeAnim 0.6s ease;
          }
          @keyframes fadeAnim {
            from { opacity: 0; transform: scale(1.05); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
        </style>
      </section>

      <Footer />
    </>
  )
}
