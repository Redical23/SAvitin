"use client";

import { useEffect, useState } from "react";
import { CountdownTimer } from "../components/countdown-timer";
import { CategoryProductGrid } from "../components/category-product-grid";

export default function ElectronicsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/news"); // ✅ changed from /api/news
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
console.log(products)
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg font-semibold">
          Loading electronics...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <section className="px-4 py-8 max-w-7xl mx-auto">
        {/* ✅ Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">
                Electronics & Gadgets
              </h1>
              <p className="text-lg text-blue-50 text-pretty">
                High-tech deals on the latest gadgets and electronics
              </p>
            </div>
            <CountdownTimer />
          </div>
        </div>

        {/* ✅ Product Grid Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Top Electronics Deals
          </h2>
          {products.length > 0 ? (
            <CategoryProductGrid products={products} />
          ) : (
            <div className="text-gray-300 text-center">No products found.</div>
          )}
        </div>

        {/* ✅ Promo Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-center mb-12">
          <p className="text-white text-xl font-semibold">
            All Electronics 40–70% OFF
          </p>
          <p className="text-blue-100 text-sm mt-2">
            Exclusive online deals — Free shipping on orders above ₹999
          </p>
        </div>

        {/* ✅ CTA Button */}
        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            View All Electronics
          </button>
        </div>
      </section>
    </main>
  );
}
