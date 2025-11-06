"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

export const staticProducts = [
  {
    _id: "1",
    name: "Noise ColorFit Pro 4 Smartwatch",
    category: "Electronics",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.3,
    description: "Track your health and fitness with advanced sensors and long battery life.",
    image: "/products/watch.jpg",
  },
  {
    _id: "2",
    name: "boAt Rockerz 450 Bluetooth Headphones",
    category: "Audio",
    price: 1599,
    originalPrice: 2990,
    discount: 47,
    rating: 4.5,
    description: "Powerful sound, deep bass, and up to 15 hours of playback.",
    image: "/products/headphones.jpg",
  },
  {
    _id: "3",
    name: "ASUS Vivobook 15 (i5 12th Gen)",
    category: "Laptops",
    price: 49990,
    originalPrice: 63990,
    discount: 22,
    rating: 4.2,
    description: "Slim, stylish laptop for work and study with a vibrant display.",
    image: "/products/laptop.jpg",
  },
  {
    _id: "4",
    name: "OnePlus Nord CE 3 Lite 5G (8GB RAM, 128GB)",
    category: "Mobiles",
    price: 19999,
    originalPrice: 22999,
    discount: 13,
    rating: 4.6,
    description: "Fast performance, 108MP camera, and smooth 120Hz display.",
    image: "/products/oneplus.jpg",
  },
];

const PRODUCTSTEMP = () => {
  const router = useRouter();

  const shuffledProducts = useMemo(() => {
    const array = [...staticProducts];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const handleCardClick = (product) => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 p-6 bg-gray-100">
      {shuffledProducts.map((product) => (
        <div
          key={product._id}
          onClick={() => handleCardClick(product)}
          className="cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            <p className="text-gray-500 text-xs mt-1">{product.category}</p>

            <div className="mt-3">
              <span className="text-lg font-bold text-green-600">₹{product.price}</span>
              <span className="text-sm text-gray-400 line-through ml-2">
                ₹{product.originalPrice}
              </span>
            </div>

            <div className="mt-2 text-sm text-yellow-500">⭐ {product.rating}/5</div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Added ${product.name} to cart!`);
                }}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold text-sm transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(product);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PRODUCTSTEMP;
