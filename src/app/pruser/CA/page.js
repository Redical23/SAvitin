"use client"

import { useEffect, useState } from "react"
import { DealHeader } from "../../components/deal-header"
import { CountdownTimer } from "../../components/countdown-timer"
import { ProductGrid } from "../../components/product-grid"
import { PromoBanner } from "../../components/promo-banner"

export default function TodaysDealPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg font-semibold">Loading deals...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
     

      {/* Hero Section */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">Today's Epic Deals</h1>
              <p className="text-lg text-orange-50 text-pretty">
                Massive discounts on thousands of products, limited time only!
              </p>
            </div>
            <CountdownTimer />
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PromoBanner title="Electronics" discount="UP TO 50% OFF" icon="📱" bgColor="from-blue-600 to-blue-700" />
          <PromoBanner title="Fashion" discount="UP TO 60% OFF" icon="👕" bgColor="from-pink-600 to-rose-700" />
          <PromoBanner
            title="Home & Garden"
            discount="UP TO 40% OFF"
            icon="🏠"
            bgColor="from-green-600 to-emerald-700"
          />
        </div>

        {/* Featured Deals Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Deals</h2>
          <ProductGrid />
        </div>

        {/* Flash Sale Banner */}
        <div className="bg-yellow-400 text-slate-900 rounded-lg p-6 text-center mb-12">
          <div className="text-5xl font-bold mb-2">🔥 FLASH SALE 🔥</div>
          <p className="text-xl font-semibold">Extra 20% OFF on selected items</p>
          <p className="text-sm mt-2 opacity-80">Use code: FLASH20 at checkout</p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            Shop All Deals
          </button>
        </div>
      </section>
    </main>
  )
}
