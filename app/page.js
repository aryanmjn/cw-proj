'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import Button from '../components/Button';
import { Sun, Mountain, Compass, Building, Palette, Search } from 'lucide-react';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  const suggestions = query.trim()
    ? DESTINATIONS.filter((destination) => {
        const searchText = `${destination.name} ${destination.country} ${destination.category}`.toLowerCase();
        return searchText.includes(query.trim().toLowerCase());
      }).slice(0, 5)
    : [];

  const handleSearch = (e, searchQuery = query) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: 'Beach', icon: Sun, color: 'text-amber-500 bg-amber-50' },
    { name: 'Mountains', icon: Mountain, color: 'text-emerald-500 bg-emerald-50' },
    { name: 'Adventure', icon: Compass, color: 'text-sky-500 bg-sky-50' },
    { name: 'City', icon: Building, color: 'text-indigo-500 bg-indigo-50' },
    { name: 'Culture', icon: Palette, color: 'text-rose-500 bg-rose-50' },
  ];

  const featured = DESTINATIONS.filter((item) => item.featured).slice(0, 3);
  const trending = DESTINATIONS.filter((item) => item.trending);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-slate-900/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30" />

        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Extraordinary <span className="text-sky-400">Destinations</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto font-light">
            Plan your next getaways, explore breathtaking natural views, and experience rich cultural heritage around the globe.
          </p>

          {/* Search Field */}
          <form onSubmit={handleSearch} className="relative z-30 max-w-xl mx-auto flex gap-2 p-2 bg-white rounded-2xl shadow-xl border border-white/20">
            <div className="relative z-30 flex-1 flex items-center pl-3">
              <Search className="w-5 h-5 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                role="combobox"
                aria-expanded={isSearchFocused && suggestions.length > 0}
                aria-controls="destination-suggestions"
                className="w-full text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base focus:outline-none"
              />
              {isSearchFocused && suggestions.length > 0 && (
                <div
                  id="destination-suggestions"
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-left shadow-xl"
                >
                  {suggestions.map((destination) => (
                    <button
                      key={destination.id}
                      type="button"
                      role="option"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQuery(destination.name);
                        setIsSearchFocused(false);
                        handleSearch(undefined, destination.name);
                      }}
                      className="w-full px-4 py-3 text-left transition-colors hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
                    >
                      <span className="block text-sm font-semibold text-slate-800">{destination.name}</span>
                      <span className="block text-xs text-slate-500">{destination.country} · {destination.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" variant="primary">Search</Button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => router.push(`/destinations?category=${cat.name}`)}
                className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className={`p-4 rounded-xl ${cat.color} mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-slate-800 text-sm">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Destinations</h2>
            <p className="text-slate-500 text-sm">Hand-picked iconic locations for your itinerary</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <DestinationCard key={item.id} destination={item} />
          ))}
        </div>
      </section>

      {/* Trending Trips Horizontal Scroll */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Trending Trips</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
          {trending.map((item) => (
            <div key={item.id} className="min-w-[280px] sm:min-w-[320px] flex-shrink-0">
              <DestinationCard destination={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}