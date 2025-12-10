"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plane, Utensils, Heart, Gift, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

const services = [
  {
    id: "Travel",
    name: "Travel",
    icon: Plane,
    color: "from-blue-400 to-cyan-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Explore exotic destinations",
    image: "/travel-destinations.jpg",
    link: "Explore Travel",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    icon: Utensils,
    color: "from-amber-400 to-orange-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Culinary experiences",
    image: "/restaurant-dining.jpg",
    link: "Browse Restaurants",
  },
  {
    id: "hotels",
    name: "Hotels",
    icon: Heart,
    color: "from-green-400 to-teal-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Find the best hotels",
    image: "/hotel.jpg",
    link: "Book Hotel",
  },
  {
    id: "events",
    name: "Events",
    icon: Gift,
    color: "from-purple-400 to-violet-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Create celebrations",
    image: "/event-planning.jpg",
    link: "Plan Event",
  },
]

export default function CategoryGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const router = useRouter()
  const { ref, isVisible, parallaxOffset } = useScrollAnimation({ threshold: 0.15 })

  return (
    <section ref={ref} className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-glow-pulse-smooth"
          style={{
            opacity: isVisible ? 0.8 : 0,
            transform: `translateY(${parallaxOffset * 0.15}px) scale(${1 + parallaxOffset * 0.0002})`,
            transition: isVisible ? "none" : "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-glow-pulse-smooth"
          style={{
            opacity: isVisible ? 0.8 : 0,
            transform: `translateY(${parallaxOffset * -0.2}px) scale(${1 + parallaxOffset * 0.0003})`,
            transition: isVisible ? "none" : "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 300ms",
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "smoothFadeInUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
          }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
            Discover Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-slate-400">Select any service to explore amazing deals and packages</p>
        </div>

        {/* Services Grid with Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          {services.map((service, idx) => {
            const Icon = service.icon
            const isHovered = hoveredId === service.id

            return (
              <div
                key={service.id}
                className="h-full"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transform: isHovered ? `translateY(-12px)` : "translateY(0)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <button
                  className={`w-full h-full flex flex-col items-center justify-between p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 group ${
                    isHovered
                      ? `${service.bgColor} ${service.borderColor} shadow-2xl`
                      : `border-slate-700 bg-slate-900/40 hover:bg-slate-900/60`
                  }`}
                  onClick={() => router.push(`/services/${service.id}`)}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible
                      ? `smoothFadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms both`
                      : "none",
                    transform: isVisible
                      ? `translateX(0) translateY(${parallaxOffset * 0.05}px)`
                      : `translateX(-40px) translateY(20px)`,
                    transitionDuration: isVisible ? "0s" : "0.6s",
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl mb-4 transition-all duration-300 transform ${
                      isHovered ? `bg-gradient-to-br ${service.color} scale-110` : "bg-slate-800 scale-100"
                    }`}
                  >
                    <Icon size={28} className={`${isHovered ? "text-white" : "text-slate-400"}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <h3
                      className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-slate-100"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isHovered ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div
                    className={`mt-4 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      isHovered ? "text-white gap-3" : "text-slate-400"
                    }`}
                  >
                    <span>{service.link}</span>
                    <ArrowRight
                      size={18}
                      className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                    />
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div
          className="mt-16 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "smoothFadeInUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 400ms both" : "none",
          }}
        >
          <p className="text-slate-400 mb-4">Ready to explore all services?</p>
          <button
            onClick={() => router.push("/services/PackageDeals")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            View Package Deals
          </button>
        </div>
      </div>
    </section>
  )
}
