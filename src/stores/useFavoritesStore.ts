import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  favorites: Photo[];
  toggleFavorite: (photo: Photo) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (photo) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f.id === photo.id);

        set({
          favorites: exists
            ? favorites.filter((f) => f.id !== photo.id)
            : [...favorites, photo],
        });
      },
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "pexels-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
