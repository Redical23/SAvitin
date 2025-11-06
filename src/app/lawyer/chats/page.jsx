"use client"

import { useEffect, useState } from "react"
import { DealHeader } from "../../components/deal-header"
import { CountdownTimer } from "../../components/countdown-timer"
import { CategoryProductGrid } from "../../components/category-product-grid"

const NEW_RELEASES_PRODUCTS = [
  {
    id: 1,
    name: "Latest Smart Watch Pro 2.0",
    price: 149,
    originalPrice: 399,
    rating: 4.9,
    reviews: 1240,
    image: "/placeholder.svg",
    discount: 63,
    badge: "New Release",
  },
  {
    id: 2,
    name: "Advanced Air Purifier HEPA",
    price: 99,
    originalPrice: 299,
    rating: 4.8,
    reviews: 890,
    image: "/placeholder.svg",
    discount: 67,
    badge: "Just Launched",
  },
  {
    id: 3,
    name: "Mini Projector 4K Ready",
    price: 179,
    originalPrice: 499,
    rating: 4.7,
    reviews: 560,
    image: "/placeholder.svg",
    discount: 64,
    badge: "Hot Item",
  },
  {
    id: 4,
    name: "Robot Vacuum Smart",
    price: 199,
    originalPrice: 599,
    rating: 4.6,
    reviews: 420,
    image: "/placeholder.svg",
    discount: 67,
    badge: "Trending",
  },
  {
    id: 5,
    name: "Portable Speaker Ultimate",
    price: 79,
    originalPrice: 229,
    rating: 4.8,
    reviews: 780,
    image: "/placeholder.svg",
    discount: 65,
    badge: "",
  },
  {
    id: 6,
    name: "Smart Lighting System",
    price: 54,
    originalPrice: 159,
    rating: 4.5,
    reviews: 650,
    image: "/placeholder.svg",
    discount: 66,
    badge: "",
  },
  {
    id: 7,
    name: "Wireless Earbuds Elite",
    price: 64,
    originalPrice: 189,
    rating: 4.9,
    reviews: 1560,
    image: "/placeholder.svg",
    discount: 66,
    badge: "",
  },
  {
    id: 8,
    name: "Fitness Tracker Advanced",
    price: 59,
    originalPrice: 169,
    rating: 4.7,
    reviews: 2340,
    image: "/placeholder.svg",
    discount: 65,
    badge: "",
  },
]

export default function NewReleasesPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg font-semibold">Loading new releases...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg p-8 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">New Releases</h1>
              <p className="text-lg text-purple-50 text-pretty">First access to the latest and greatest products</p>
            </div>
            <CountdownTimer />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Latest Arrivals</h2>
          <CategoryProductGrid products={NEW_RELEASES_PRODUCTS} />
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-center mb-12">
          <p className="text-white text-xl font-semibold">New Releases 60-67% OFF</p>
          <p className="text-purple-100 text-sm mt-2">Be the first to own - Early bird specials on new products</p>
        </div>

        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            Explore New Releases
          </button>
        </div>
      </section>
    </main>
  )
}
