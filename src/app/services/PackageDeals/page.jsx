"use client"

import DynamicHeader from "../../components/dynamic-header"
import Footer from "../../components/footer"
import { Zap, MapPin, Star, ChevronLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollAnimation } from "../../hooks/use-scroll-animation"

const bundleDeals = [
  {
    id: 1,
    name: "Smart Traveler Bundle",
    includes: ["Luxury Car", "5-Star Hotel", "Premium Restaurant"],
    originalPrice: 65000,
    discountedPrice: 45500,
    discount: "30%",
    color: "from-blue-600 to-cyan-500",
    description: "Book a car, hotel, and restaurant in one package",
  },
  {
    id: 2,
    name: "Weekend Getaway Bundle",
    includes: ["Premium SUV", "Beach Resort", "Fine Dining"],
    originalPrice: 78000,
    discountedPrice: 52920,
    discount: "32%",
    color: "from-purple-600 to-pink-500",
    description: "Perfect for weekend escapes with all amenities",
  },
  {
    id: 3,
    name: "Business Travel Bundle",
    includes: ["Executive Car", "Business Hotel", "Corporate Restaurant"],
    originalPrice: 55000,
    discountedPrice: 38500,
    discount: "30%",
    color: "from-green-600 to-emerald-500",
    description: "Complete business travel solution",
  },
]

const packageDeals = [
  {
    id: 1,
    name: "Romantic Getaway Package",
    location: "Maldives",
    type: "Couples Package",
    rating: 4.9,
    reviews: 3200,
    img: "/bmw1.jpg",
    description: "All-inclusive romantic escape with luxury hotel, spa, and yacht cruise",
  },
  {
    id: 2,
    name: "Family Adventure Bundle",
    location: "Shimla & Manali",
    type: "Family Vacation",
    rating: 4.8,
    reviews: 2800,
    img: "/bmw2.jpg",
    description: "Complete family package with hotel, car rental, activities, and meals",
  },
  {
    id: 3,
    name: "Business Traveler Plus",
    location: "Pan India",
    type: "Corporate Package",
    rating: 4.7,
    reviews: 2100,
    img: "/bmw3.jpg",
    description: "Hassle-free business package with premium hotel and car rental",
  },
  {
    id: 4,
    name: "Backpacker's Grand Tour",
    location: "South India",
    type: "Budget Adventure",
    rating: 4.6,
    reviews: 1900,
    img: "/bmw1.jpg",
    description: "Affordable multi-city package covering Kerala, Karnataka, and Tamil Nadu",
  },
  {
    id: 5,
    name: "Luxury Wedding Package",
    location: "Rajasthan",
    type: "Wedding Package",
    rating: 4.9,
    reviews: 3400,
    img: "/bmw2.jpg",
    description: "Complete wedding celebration with palace hotel, events, and car service",
  },
  {
    id: 6,
    name: "Festival Celebration Pack",
    location: "Multiple Cities",
    type: "Festival Tour",
    rating: 4.8,
    reviews: 2600,
    img: "/bmw3.jpg",
    description: "Experience Indian festivals with accommodation, transport, and events",
  },
]

function PackageCard({ pkg, isVisible, idx }) {
  return (
    <div
      className={`bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all transform duration-700 group cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: isVisible ? `${idx * 50}ms` : "0ms",
      }}
    >
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={pkg.img || "/placeholder.svg"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={pkg.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-300 font-semibold text-sm">{pkg.rating}</span>
          </div>
          <span className="text-slate-400 text-sm">({pkg.reviews} bookings)</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">{pkg.name}</h3>

        <p className="text-yellow-300 text-sm font-medium mb-3">{pkg.type}</p>

        <p className="text-slate-300 text-sm mb-4">{pkg.description}</p>

        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <MapPin size={16} className="text-yellow-400" />
          <span className="text-sm">{pkg.location}</span>
        </div>

        <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105">
          View Package
        </button>
      </div>
    </div>
  )
}

function BundleCard({ bundle, isVisible, idx }) {
  return (
    <div
      className={`bg-gradient-to-br ${bundle.color} rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all transform duration-700 group cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: isVisible ? `${idx * 50}ms` : "0ms",
      }}
    >
      <div className="p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{bundle.name}</h3>
          <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
            <span className="font-bold text-lg">{bundle.discount} OFF</span>
          </div>
        </div>

        <p className="text-white/80 mb-6">{bundle.description}</p>

        <div className="space-y-3 mb-8">
          {bundle.includes.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check size={20} className="text-white" />
              <span className="text-white/90">{item}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 pb-6 border-b border-white/20">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-white/60 line-through">₹{bundle.originalPrice.toLocaleString()}</span>
            <span className="text-3xl font-bold">₹{bundle.discountedPrice.toLocaleString()}</span>
          </div>
          <p className="text-white/70 text-sm">
            Save ₹{(bundle.originalPrice - bundle.discountedPrice).toLocaleString()}
          </p>
        </div>

        <button className="w-full px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
          Book This Bundle
        </button>
      </div>
    </div>
  )
}

export default function PackageDealsPage() {
  const router = useRouter()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation({ threshold: 0.1 })

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
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <Zap size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Package Deals</h1>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Special Bundle Offers</h2>
            <p className="text-slate-300 mb-8">Book multiple services together and save big!</p>
            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bundleDeals.map((bundle, idx) => (
                <BundleCard key={bundle.id} bundle={bundle} isVisible={isVisible} idx={idx} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-16 border-t border-slate-700/50" />

          <h2 className="text-3xl font-bold text-white mb-8">Premium Packages</h2>
          <p className="text-slate-300 text-lg mb-12">All-inclusive packages for every type of traveler</p>

          <div ref={ref2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageDeals.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} isVisible={isVisible2} idx={idx} />
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
