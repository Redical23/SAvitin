"use client"

import { ShoppingCart, Heart, User } from "lucide-react"
import Link from "next/link"

export function DealHeader() {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-3xl font-bold">🛍️</div>
          <h1 className="text-2xl font-bold">ShopHub</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-orange-200 transition font-medium">
            Home
          </Link>
          <Link href="/pruser/CA" className="hover:text-orange-200 transition font-medium">
            Todays Deal
          </Link>
          <Link href="/News" className="hover:text-orange-200 transition font-medium">
            Electronics
          </Link>
          <Link href="/Constitustion" className="hover:text-orange-200 transition font-medium">
            Home & Kitchen
          </Link>
          <Link href="/pruser/internship" className="hover:text-orange-200 transition font-medium">
            Fashion
          </Link>
          <Link href="/lawyer/chats" className="hover:text-orange-200 transition font-medium">
            New Releases
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-orange-700 rounded-full transition">
            <Heart size={24} />
          </button>
          <button className="p-2 hover:bg-orange-700 rounded-full transition relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 hover:bg-orange-700 rounded-full transition">
            <User size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
