'use client';

import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-t from-slate-950 to-slate-900 text-white overflow-hidden">
      
      {/* Glowing Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ST</span>
            </div>
            <h3 className="text-2xl font-bold text-white">THE SAVITIN</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Discover the best places, services, and listings near you with premium quality & verified options.
          </p>
        </div>

        {/* Helpful Links */}
        <div>
          <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
            Helpful Links
          </h4>
          <ul className="space-y-3">
            {['Categories', 'Reviews', 'Listing', 'Contact Us', 'About Us', 'Privacy Policy'].map((link) => (
              <li key={link}>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Empty Column for spacing */}
        <div></div>

        {/* Contact */}
        <div>
          <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
            Contact Us
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <p className="text-slate-400 text-sm">27th Street of New Town, Digital Villa</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <a href="tel:+1010200340" className="text-slate-400 hover:text-cyan-400 text-sm">
                010-020-0340
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <a href="mailto:contact@thesavitin.com" className="text-slate-400 hover:text-cyan-400 text-sm">
                contact@thesavitin.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 py-6 text-center text-slate-400">
        Copyright © 2025 Plotlist Co., Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
