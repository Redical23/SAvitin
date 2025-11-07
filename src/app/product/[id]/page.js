"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Footer from "../../slidebar/FOOTER";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Fetch all products from your backend API
        const response = await fetch("/api/news");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // ✅ Find the product matching the dynamic route ID
        const foundProduct = data.find((item) => item._id === params.id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  // 🕐 Loading UI
  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  // ❌ Product not found
  if (!product) return notFound();

  // ✅ Product details UI
  return (
    <>
      <div className="p-6 flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg w-full md:w-1/2 object-cover"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-lg">{product.category}</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-green-600">
              ₹{product.price}
            </span>
            {product.discount && (
              <span className="line-through text-gray-400 text-lg">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-600">
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>

          <p className="text-sm text-gray-500">
            Stock available: {product.stock}
          </p>

          <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full w-fit font-medium">
            {product.badge}
          </span>

          <button className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition w-fit">
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
