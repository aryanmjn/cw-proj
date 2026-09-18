import React from 'react';
import Link from 'next/link';
import { Compass, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Compass className="w-6 h-6 text-sky-500" />
              <span>Travel Explorer</span>
            </div>
            <p className="text-sm leading-relaxed">
              Discover breathtaking destinations, plan custom trips, and explore world culture seamlessly.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition">Beaches</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Mountains</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Adventure</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Culture</span></li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-white text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition"><Facebook className="w-5 h-5" /></a>
            </div>
          </div> */}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Travel Explorer. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}