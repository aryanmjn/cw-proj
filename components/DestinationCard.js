'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Heart } from 'lucide-react';
import Badge from './Badge';
import { useWishlist } from '../hooks/useWishlist';

export default function DestinationCard({ destination }) {
  const { isSaved, toggleSave } = useWishlist();
  const saved = isSaved(destination.id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">

      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3">
          <Badge variant="sky" className="bg-white/90 backdrop-blur-md text-sky-800 border-none shadow-sm">
            {destination.category}
          </Badge>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSave(destination.id);
          }}
          aria-label="Save destination"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white hover:text-rose-500 transition-all duration-200 shadow-sm"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between w-80">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors duration-200">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{destination.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{destination.country}</span>
          </div>

          <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {destination.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-slate-400 block">Est. Cost</span>
            <span className="text-base font-bold text-sky-600">${destination.pricePerDay}</span>
            <span className="text-xs text-slate-500 font-normal"> / day</span>
          </div>
          <Link
            href={`/destinations/${destination.id}`}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group/btn"
          >
            Explore
            <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}