"use client"

import { useEffect, useState } from "react"
import { DealHeader } from "../components/deal-header"
import { CountdownTimer } from "../components/countdown-timer"
import { CategoryProductGrid } from "../components/category-product-grid"

const HOME_KITCHEN_PRODUCTS = [
  {
    id: 1,
    name: "Premium Cookware Set 12-Piece",
    price: 89,
    originalPrice: 299,
    rating: 4.9,
    reviews: 4210,
    image: "/cookware-set.jpg",
    discount: 70,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Pillow Set Queen Size (4-Pack)",
    price: 45,
    originalPrice: 129,
    rating: 4.8,
    reviews: 3890,
    image: "/pillow-set.jpg",
    discount: 65,
    badge: "Limited Stock",
  },
  {
    id: 3,
    name: "Kitchen Knife Set 7-Piece",
    price: 35,
    originalPrice: 119,
    rating: 4.7,
    reviews: 2140,
    image: "/placeholder.svg",
    discount: 71,
    badge: "Flash Sale",
  },
  {
    id: 4,
    name: "Blender Pro 1200W",
    price: 59,
    originalPrice: 179,
    rating: 4.6,
    reviews: 1980,
    image: "/placeholder.svg",
    discount: 67,
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "Coffee Maker Automatic",
    price: 29,
    originalPrice: 89,
    rating: 4.5,
    reviews: 2670,
    image: "/placeholder.svg",
    discount: 67,
    badge: "",
  },
  {
    id: 6,
    name: "Bed Sheets Cotton 300TC",
    price: 24,
    originalPrice: 79,
    rating: 4.8,
    reviews: 5320,
    image: "/placeholder.svg",
    discount: 70,
    badge: "",
  },
  {
    id: 7,
    name: "Non-Stick Frying Pan Set",
    price: 32,
    originalPrice: 99,
    rating: 4.6,
    reviews: 3450,
    image: "/placeholder.svg",
    discount: 68,
    badge: "",
  },
  {
    id: 8,
    name: "Storage Container Organizer Set",
    price: 19,
    originalPrice: 59,
    rating: 4.4,
    reviews: 2890,
    image: "/placeholder.svg",
    discount: 68,
    badge: "",
  },
]

export default function HomeKitchenPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg font-semibold">Loading home & kitchen...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
    

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg p-8 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">Home & Kitchen</h1>
              <p className="text-lg text-green-50 text-pretty">
                Everything you need to create your perfect home and kitchen
              </p>
            </div>
            <CountdownTimer />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Home & Kitchen Deals</h2>
          <CategoryProductGrid products={HOME_KITCHEN_PRODUCTS} />
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-center mb-12">
          <p className="text-white text-xl font-semibold">Home & Kitchen 50-70% OFF</p>
          <p className="text-green-100 text-sm mt-2">Perfect your living space - Free delivery on orders above $40</p>
        </div>

        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            View All Home & Kitchen
          </button>
        </div>
      </section>
    </main>
  )
}
