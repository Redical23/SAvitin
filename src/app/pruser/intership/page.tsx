"use client"

import { useEffect, useState } from "react"
import { DealHeader } from "../../components/deal-header"
import { CountdownTimer } from "../../components/countdown-timer"
import { CategoryProductGrid } from "../../components/category-product-grid"

const FASHION_PRODUCTS = [
  {
    id: 1,
    name: "Cotton T-Shirt Bundle (3-Pack)",
    price: 24,
    originalPrice: 79,
    rating: 4.8,
    reviews: 5680,
    image: "/cotton-tshirt.jpg",
    discount: 70,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Skinny Jeans Premium Denim",
    price: 35,
    originalPrice: 99,
    rating: 4.7,
    reviews: 3210,
    image: "/placeholder.svg",
    discount: 65,
    badge: "Limited Stock",
  },
  {
    id: 3,
    name: "Sports Jacket Windproof",
    price: 42,
    originalPrice: 149,
    rating: 4.9,
    reviews: 2890,
    image: "/placeholder.svg",
    discount: 72,
    badge: "Flash Sale",
  },
  {
    id: 4,
    name: "Casual Sneakers Unisex",
    price: 39,
    originalPrice: 129,
    rating: 4.6,
    reviews: 4120,
    image: "/placeholder.svg",
    discount: 70,
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "Summer Dress Collection",
    price: 28,
    originalPrice: 89,
    rating: 4.5,
    reviews: 2340,
    image: "/placeholder.svg",
    discount: 69,
    badge: "",
  },
  {
    id: 6,
    name: "Leather Belt Premium",
    price: 19,
    originalPrice: 59,
    rating: 4.8,
    reviews: 1890,
    image: "/placeholder.svg",
    discount: 68,
    badge: "",
  },
  {
    id: 7,
    name: "Hoodie Sweatshirt Cozy",
    price: 32,
    originalPrice: 99,
    rating: 4.7,
    reviews: 3670,
    image: "/placeholder.svg",
    discount: 68,
    badge: "",
  },
  {
    id: 8,
    name: "Wool Beanie Winter Cap",
    price: 12,
    originalPrice: 39,
    rating: 4.4,
    reviews: 2150,
    image: "/placeholder.svg",
    discount: 69,
    badge: "",
  },
]

export default function FashionPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg font-semibold">Loading fashion...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <DealHeader />

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-lg p-8 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">Fashion & Apparel</h1>
              <p className="text-lg text-pink-50 text-pretty">Trendy styles and premium fashion at unbeatable prices</p>
            </div>
            <CountdownTimer />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Fashion Deals</h2>
          <CategoryProductGrid products={FASHION_PRODUCTS} />
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg p-6 text-center mb-12">
          <p className="text-white text-xl font-semibold">Fashion 60-72% OFF</p>
          <p className="text-pink-100 text-sm mt-2">Limited collection - Free returns on all fashion items</p>
        </div>

        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            Shop Fashion Now
          </button>
        </div>
      </section>
    </main>
  )
}
