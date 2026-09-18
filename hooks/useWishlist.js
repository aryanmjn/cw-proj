'use client';
import { useState, useEffect } from 'react';

export function useWishlist() {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('travel_wishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalized = parsed.map((item) => (
          typeof item === 'string' ? { id: item, days: 3 } : item
        ));
        const restoreWishlist = setTimeout(() => setSavedItems(normalized), 0);
        localStorage.setItem('travel_wishlist', JSON.stringify(normalized));
        return () => clearTimeout(restoreWishlist);
      }
    } catch (error) {
      console.error('Failed to read wishlist from localStorage', error);
    }
  }, []);

  const toggleSave = (id, days = 3) => {
    setSavedItems((prev) => {
      const isSaved = prev.some((item) => item.id === id);
      const updated = isSaved
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, days }];
      try {
        localStorage.setItem('travel_wishlist', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save wishlist to localStorage', error);
      }
      return updated;
    });
  };

  const isSaved = (id) => savedItems.some((item) => item.id === id);
  const getSavedItem = (id) => savedItems.find((item) => item.id === id);

  return { savedItems, toggleSave, isSaved, getSavedItem };
}