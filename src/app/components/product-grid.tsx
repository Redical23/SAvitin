"use client"

import { Star, TrendingUp } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge?: string
}

const products: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 1299,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 2430,
    image: "/wireless-headphones.jpg",
    badge: "56% OFF",
  },
  {
    id: 2,
    title: "4K Smart TV 55 inch",
    price: 24999,
    originalPrice: 49999,
    rating: 4.7,
    reviews: 1856,
    image: "/4k-smart-tv.jpg",
    badge: "50% OFF",
  },
  {
    id: 3,
    title: "Premium Cotton T-Shirt Pack",
    price: 399,
    originalPrice: 999,
    rating: 4.3,
    reviews: 5621,
    image: "/cotton-tshirt.jpg",
    badge: "60% OFF",
  },
  {
    id: 4,
    title: "Stainless Steel Cookware Set",
    price: 2499,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 892,
    image: "/cookware-set.jpg",
    badge: "58% OFF",
  },
  {
    id: 5,
    title: "Portable Phone Charger 20000mAh",
    price: 899,
    originalPrice: 1999,
    rating: 4.4,
    reviews: 3245,
    image: "/power-bank.jpg",
    badge: "55% OFF",
  },
  {
    id: 6,
    title: "Memory Foam Pillow Set",
    price: 1599,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 1523,
    image: "/pillow-set.jpg",
    badge: "60% OFF",
  },
  {
    id: 7,
    title: "Wireless Gaming Mouse",
    price: 1499,
    originalPrice: 3499,
    rating: 4.5,
    reviews: 2104,
    image: "/gaming-mouse.jpg",
    badge: "57% OFF",
  },
  {
    id: 8,
    title: "Stainless Steel Water Bottle",
    price: 599,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 4156,
    image: "/clear-water-bottle.png",
    badge: "60% OFF",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 group cursor-pointer border border-slate-700 hover:border-orange-500"
        >
          {/* Image Container */}
          <div className="relative bg-slate-700 aspect-square overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {product.badge && (
              <div className="absolute top-3 right-3 bg-red-600 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                {product.badge}
              </div>
            )}
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-2 py-1 rounded flex items-center gap-1 text-xs font-bold shadow-lg">
              <TrendingUp size={14} /> HOT DEAL
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition">
              {product.title}
            </h3>

            {/* Price */}
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-2 rounded-lg transition-all transform hover:scale-105 shadow-md">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
