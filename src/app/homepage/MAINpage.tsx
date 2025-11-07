"use client"

import { Suspense, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LAHEAD from "../slidebar/LAHEAD"
import { CategoryProductGrid } from "../components/category-product-grid"
import { Zap, Filter } from "lucide-react"
import Featuredlawyer from "../slidebar/feature-lawyer"
import Footer from "../slidebar/FOOTER"
const ITEMS_PER_PAGE = 12
const FILTER_OPTIONS = ["All", "Best Seller", "New Release", "Hot Deal", "Limited Stock", "On Sale"]

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  discount: number
  badge: string
  stock?: number
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Best Seller",
    price: 2499,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 1240,
    image: "/wireless-headphones.jpg",
    discount: 58,
    badge: "Best Seller",
    stock: 45,
  },

  {
    id: 3,
    name: "4K Ultra HD Camera",
    category: "Hot Deal",
    price: 8999,
    originalPrice: 24999,
    rating: 4.9,
    reviews: 2100,
    image: "/camara.jpg",
    discount: 64,
    badge: "Hot Deal",
    stock: 156,
  },
  {
    id: 4,
    name: "Portable Power Bank 20000mAh",
    category: "On Sale",
    price: 999,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 560,
    image: "/power-bank.jpg",
    discount: 60,
    badge: "",
    stock: 89,
  },
  {
    id: 5,
    name: "Premium Mechanical Keyboard RGB",
    category: "Best Seller",
    price: 3499,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 420,
    image: "/keyborad.jpg",
    discount: 56,
    badge: "Best Seller",
    stock: 5,
  },
  {
    id: 6,
    name: "Ultra-Thin Laptop Stand",
    category: "New Release",
    price: 1299,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 650,
    image: "/laptopstand.jpg",
    discount: 57,
    badge: "New Release",
    stock: 200,
  },
  {
    id: 7,
    name: "Wireless Mouse Pro",
    category: "Best Seller",
    price: 799,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 1560,
    image: "/mouse.jpg",
    discount: 60,
    badge: "",
    stock: 120,
  },
  {
    id: 8,
    name: "USB-C Hub Adapter 7-in-1",
    category: "Hot Deal",
    price: 1499,
    originalPrice: 3499,
    rating: 4.5,
    reviews: 2340,
    image: "/usb.jpg",
    discount: 57,
    badge: "Hot Deal",
    stock: 34,
  },
  {
    id: 9,
    name: "Desk Lamp LED Smart",
    category: "Limited Stock",
    price: 1899,
    originalPrice: 4499,
    rating: 4.7,
    reviews: 890,
    image: "/lap.jpg",
    discount: 58,
    badge: "Limited Stock",
    stock: 8,
  },

  {
    id: 11,
    name: "Premium HDMI Cable 2.1",
    category: "Best Seller",
    price: 499,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 1200,
    image: "/usb.jpg",
    discount: 62,
    badge: "Best Seller",
    stock: 450,
  },

]

function ProductPageContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(SAMPLE_PRODUCTS)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = products.filter(
    (product) => selectedFilter === "All" || product.category === selectedFilter || product.badge === selectedFilter,
  )

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
     <LAHEAD/>
     <Featuredlawyer/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white px-4 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3">
                <Zap className="w-10 h-10" />
                Amazing Deals & Products
              </h1>
              <p className="text-lg text-blue-50 max-w-2xl">
                Discover our curated collection of best-selling items, hot deals, and new releases
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Products
              </h2>
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showMobileFilter ? "Hide" : "Show"} Filters
              </button>
            </div>

            <motion.div
              initial={false}
              animate={{ height: showMobileFilter ? "auto" : 0 }}
              className="overflow-hidden md:overflow-visible md:h-auto mb-4 md:mb-0"
            >
              <div className="flex flex-wrap gap-3 py-4 md:py-0">
                {FILTER_OPTIONS.map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFilter(filter)
                      setCurrentPage(1)
                      setShowMobileFilter(false)
                    }}
                    className={`px-5 py-2 rounded-full font-medium transition-all ${
                      selectedFilter === filter
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage + selectedFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {paginatedProducts.length > 0 ? (
                  <CategoryProductGrid products={paginatedProducts} />
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-600 text-lg">No products found in this category</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Previous
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Next
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-gray-600 text-lg font-semibold">Loading products...</div>
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  )
}
