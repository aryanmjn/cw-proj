'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS } from '../../../data/destinations';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import DestinationCard from '../../../components/DestinationCard';
import { useWishlist } from '../../../hooks/useWishlist';
import { Star, MapPin, Calendar, CheckCircle2, Minus, Plus, Heart } from 'lucide-react';

export default function DestinationDetailsPage({ params }) {
  const { id } = React.use(params);
  const destination = DESTINATIONS.find((item) => item.id === id) || DESTINATIONS[0];
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [days, setDays] = useState(3);
  const [loadingSave, setLoadingSave] = useState(false);
  
  const { isSaved, toggleSave, getSavedItem } = useWishlist();
  const saved = isSaved(destination.id);
  const savedItem = getSavedItem(destination.id);

  useEffect(() => {
    if (!savedItem) return undefined;
    const restoreDays = setTimeout(() => setDays(savedItem.days), 0);
    return () => clearTimeout(restoreDays);
  }, [savedItem]);

  const related = DESTINATIONS.filter(
    (item) => item.category === destination.category && item.id !== destination.id
  ).slice(0, 3);

  const handleSaveToggle = () => {
    setLoadingSave(true);
    setTimeout(() => {
      toggleSave(destination.id, days);
      setLoadingSave(false);
    }, 400);
  };

  const totalPrice = destination.pricePerDay * days;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-600">Home</Link>
        <span>/</span>
        <Link href="/destinations" className="hover:text-slate-600">Destinations</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">{destination.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="sky">{destination.category}</Badge>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{destination.rating}</span>
                <span className="text-slate-400 font-normal">({destination.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{destination.name}</h1>
            <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{destination.country}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm">
            <div>
              <span className="text-slate-400 block text-xs">Estimated Daily Rate</span>
              <span className="font-bold text-slate-800 text-lg">${destination.pricePerDay}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Best Time To Visit</span>
              <div className="flex items-center gap-1 font-semibold text-slate-800 mt-1">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>{destination.bestTime}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">About Destination</h2>
            <p className={`text-slate-600 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {destination.description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-2 inline-block focus:outline-none"
            >
              {isExpanded ? 'Read Less ▲' : 'Read More ▼'}
            </button>
          </div>
          {destination.highlights && (
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Select Duration</span>
                <span className="text-sm font-semibold text-slate-800">{days} {days === 1 ? 'Day' : 'Days'}</span>
              </div>

              <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl">
                <button
                  onClick={() => setDays((d) => Math.max(d - 1, 1))}
                  className="p-1.5 bg-white text-slate-700 rounded-lg hover:bg-slate-200 transition"
                  aria-label="Decrease days"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-slate-800 w-6 text-center text-sm">{days}</span>
                <button
                  onClick={() => setDays((d) => d + 1)}
                  className="p-1.5 bg-white text-slate-700 rounded-lg hover:bg-slate-200 transition"
                  aria-label="Increase days"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-sky-50 rounded-xl border border-sky-100">
              <span className="text-sm font-medium text-sky-900">Total Estimated Trip Cost</span>
              <span className="text-2xl font-extrabold text-sky-700">${totalPrice}</span>
            </div>
            <Button
              variant={saved ? 'secondary' : 'primary'}
              size="lg"
              className="w-full gap-2"
              loading={loadingSave}
              onClick={handleSaveToggle}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              {saved ? 'Saved to Wishlist' : 'Save Trip'}
            </Button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="pt-10 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <DestinationCard key={item.id} destination={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}