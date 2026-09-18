'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DESTINATIONS } from '../../data/destinations';
import { useDestinations } from '../../hooks/useDestinations';
import DestinationCard from '../../components/DestinationCard';
import SearchInput from '../../components/SearchInput';
import Button from '../../components/Button';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const categories = ['All', 'Beach', 'Mountains', 'Adventure', 'City', 'Culture'];

  const {
    searchQuery,
    selectedCategory,
    sortBy,
    currentPage,
    totalPages,
    totalItems,
    destinations,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    setCurrentPage,
  } = useDestinations(DESTINATIONS, 6);

  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSearch) setSearchQuery(initialSearch);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Explore Destinations</h1>
        <p className="text-slate-500 text-sm mt-1">
          Showing {totalItems} locations matching your filter requirements
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="w-full md:max-w-md">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-sm text-slate-500 whitespace-nowrap">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="rating-desc">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name (A-Z)</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((item) => (
            <DestinationCard key={item.id} destination={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-base">No destinations match your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Reset Filters
          </Button>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}