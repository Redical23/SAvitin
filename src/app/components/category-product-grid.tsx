"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  discount: number
  badge?: string
}

interface CategoryProductGridProps {
  products: Product[]
}

export function CategoryProductGrid({ products }: CategoryProductGridProps) {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          {/* Product Image */}
          <div className="relative h-48 bg-slate-700 overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Discount Badge */}
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              -{product.discount}%
            </div>

            {/* Category Badge */}
            {product.badge && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                {product.badge}
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute bottom-2 right-2 bg-slate-700 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
              aria-label="Add to favorites"
            >
              <Heart size={20} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 h-10">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-500"}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 ml-1">({product.reviews.toLocaleString()})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-orange-400">${product.price}</span>
              <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105">
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
