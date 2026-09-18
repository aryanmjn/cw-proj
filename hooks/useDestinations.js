'use client';
import { useState, useMemo } from 'react';

export function useDestinations(initialData = [], itemsPerPage = 12) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDestinations = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialData, searchQuery, selectedCategory]);

  const sortedDestinations = useMemo(() => {
    const list = [...filteredDestinations];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.pricePerDay - b.pricePerDay);
      case 'price-desc':
        return list.sort((a, b) => b.pricePerDay - a.pricePerDay);
      case 'rating-desc':
        return list.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filteredDestinations, sortBy]);

  const totalPages = Math.ceil(sortedDestinations.length / itemsPerPage) || 1;
  const paginatedDestinations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedDestinations.slice(start, start + itemsPerPage);
  }, [sortedDestinations, currentPage, itemsPerPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    currentPage,
    totalPages,
    totalItems: sortedDestinations.length,
    destinations: paginatedDestinations,
    setSearchQuery: handleSearchChange,
    setSelectedCategory: handleCategoryChange,
    setSortBy: handleSortChange,
    setCurrentPage,
  };
}