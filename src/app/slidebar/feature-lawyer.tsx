"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Zap } from "lucide-react"

interface Product {
  _id: string
  name: string
  category: string
  price: number
  originalPrice: number
  discount?: boolean
  image: string
  featured?: boolean
  rating?: number
  reviews?: number
  stock?: number
  badge?: "New" | "Best Seller" | "Hot Deal" | "Limited"
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  useEffect(() => {
    const staticProducts: Product[] = [
      {
        _id: "1",
        name: "Noise ColorFit Pro 4 Smartwatch",
        category: "Electronics",
        price: 2999,
        originalPrice: 4999,
        discount: true,
        image: "/22.png",
        featured: true,
        rating: 4.5,
        reviews: 328,
        stock: 45,
        badge: "Best Seller",
      },
      {
        _id: "2",
        name: "boAt Rockerz 450 Bluetooth Headphones",
        category: "Audio",
        price: 1599,
        originalPrice: 3490,
        discount: true,
        image: "/h10.png",
        featured: true,
        rating: 4.3,
        reviews: 512,
        stock: 82,
        badge: "Hot Deal",
      },
      {
        _id: "3",
        name: "ASUS Vivobook 15 Laptop (i5 12th Gen)",
        category: "Computers",
        price: 49990,
        originalPrice: 63990,
        discount: true,
        image: "/h8.png",
        featured: true,
        rating: 4.7,
        reviews: 195,
        stock: 12,
        badge: "Limited",
      },
      {
        _id: "4",
        name: "OnePlus Nord CE 3 Lite 5G (8GB RAM, 128GB)",
        category: "Mobiles",
        price: 19999,
        originalPrice: 22999,
        discount: true,
        image: "/h7.jpg",
        featured: true,
        rating: 4.6,
        reviews: 847,
        stock: 156,
        badge: "New",
      },
    ]

    setTimeout(() => setProducts(staticProducts), 500)
  }, [])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  const getDiscountPercentage = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Hot Deal":
        return "bg-red-500"
      case "Best Seller":
        return "bg-yellow-500"
      case "New":
        return "bg-blue-500"
      case "Limited":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  if (products.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-sm text-gray-500 mt-1">Curated deals just for you</p>
        </div>
        <Link
          href="/products"
          className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 transition-colors"
        >
          View All
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => {
          const discountPercent = product.discount ? getDiscountPercentage(product.price, product.originalPrice) : 0
          const isLowStock = product.stock && product.stock < 20

          return (
            <div
              key={product._id}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl hover:border-orange-300 transition-all duration-300 bg-white hover:-translate-y-1"
            >
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={product.image || "/fallback.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {product.badge && (
                  <div
                    className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1`}
                  >
                    {product.badge === "Hot Deal" && <Zap className="w-3 h-3" />}
                    {product.badge}
                  </div>
                )}

                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{discountPercent}%
                  </div>
                )}

                {isLowStock && (
                  <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Only {product.stock} left
                  </div>
                )}

                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute bottom-2 right-2 bg-white hover:bg-orange-50 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist.has(product._id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                  {product.discount && (
                    <span className="text-xs line-through text-gray-400">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-1">{product.category}</p>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/product/${product._id}`}
                    className="flex-1 text-center bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2 rounded-md transition-all"
                  >
                    View
                  </Link>
                  <button className="flex-1 bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-600 text-xs font-semibold py-2 rounded-md transition-all flex items-center justify-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
