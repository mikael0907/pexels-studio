import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Photo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorites = (photo: Photo) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === photo.id);
      return isFavorite
        ? prev.filter((fav) => fav.id !== photo.id)
        : [...prev, photo];
    });
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((photo) => photo.id === id);
  };

  return { favorites, toggleFavorites, isFavorite };
};
