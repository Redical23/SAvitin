'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
  const [location, setLocation] = useState('');

  return (
    <section className="relative w-full py-12 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Search Container */}
        <div className="flex flex-col md:flex-row gap-4 items-center 
          bg-slate-900/40 backdrop-blur-xl border border-slate-700/50
          rounded-2xl shadow-xl p-6">
          
          {/* All Areas Dropdown */}
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700 
              text-slate-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          >
            <option>All Areas</option>
            <option>Metropolitan</option>
            <option>Suburban</option>
            <option>Rural</option>
          </select>

          {/* Location Input */}
          <input
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700 
              text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />

          {/* Price Range Dropdown */}
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700 
              text-slate-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          >
            <option>Price Range</option>
            <option>Under $100</option>
            <option>$100 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>

          {/* Search Button */}
          <button
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg
              bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold
              hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all"
          >
            <Search size={20} />
            <span className="hidden sm:inline">Search Now</span>
          </button>

        </div>
      </div>
    </section>
  );
}
