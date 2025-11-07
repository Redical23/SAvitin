"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          🚀 Shophub
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Something amazing is on the way.  
          We’re launching soon — stay tuned!
        </p>

        <div className="flex justify-center space-x-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-xl font-semibold transition-all">
            Notify Me
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 text-gray-400 text-sm"
      >
        &copy; {new Date().getFullYear()} Shophub. All rights reserved.
      </motion.div>
    </div>
  );
}
