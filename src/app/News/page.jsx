"use client"

import { useEffect, useState } from "react"
import { DealHeader } from "../components/deal-header"
import { CountdownTimer } from "../components/countdown-timer"
import { CategoryProductGrid } from "../components/category-product-grid"

const ELECTRONICS_PRODUCTS = [
  {
    id: 1,
    name: '4K Smart TV 55"',
    price: 299,
    originalPrice: 699,
    rating: 4.8,
    reviews: 2150,
    image: "/4k-smart-tv.jpg",
    discount: 57,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Wireless Headphones Pro",
    price: 79,
    originalPrice: 199,
    rating: 4.7,
    reviews: 3420,
    image: "/wireless-headphones.jpg",
    discount: 60,
    badge: "Limited Stock",
  },
  {
    id: 3,
    name: "Gaming Mouse RGB",
    price: 45,
    originalPrice: 129,
    rating: 4.9,
    reviews: 1890,
    image: "/gaming-mouse.jpg",
    discount: 65,
    badge: "Flash Sale",
  },
  {
    id: 4,
    name: "Power Bank 30000mAh",
    price: 25,
    originalPrice: 69,
    rating: 4.6,
    reviews: 5420,
    image: "/power-bank.jpg",
    discount: 64,
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "USB-C Hub Adapter",
    price: 35,
    originalPrice: 89,
    rating: 4.5,
    reviews: 1240,
    image: "/placeholder.svg",
    discount: 61,
    badge: "",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 89,
    originalPrice: 249,
    rating: 4.8,
    reviews: 2890,
    image: "/placeholder.svg",
    discount: 64,
    badge: "",
  },
  {
    id: 7,
    name: "Wireless Charger Pad",
    price: 22,
    originalPrice: 59,
    rating: 4.4,
    reviews: 3120,
    image: "/placeholder.svg",
    discount: 63,
    badge: "",
  },
  {
    id: 8,
    name: "4K Webcam",
    price: 119,
    originalPrice: 349,
    rating: 4.7,
    reviews: 1560,
    image: "/placeholder.svg",
    discount: 66,
    badge: "",
  },
]

export default function ElectronicsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg font-semibold">Loading electronics...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
   

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">Electronics & Gadgets</h1>
              <p className="text-lg text-blue-50 text-pretty">High-tech deals on the latest gadgets and electronics</p>
            </div>
            <CountdownTimer />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Top Electronics Deals</h2>
          <CategoryProductGrid products={ELECTRONICS_PRODUCTS} />
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-center mb-12">
          <p className="text-white text-xl font-semibold">All Electronics 40-70% OFF</p>
          <p className="text-blue-100 text-sm mt-2">Exclusive online deals - Free shipping on orders above $50</p>
        </div>

        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            View All Electronics
          </button>
        </div>
      </section>
    </main>
  )
}
