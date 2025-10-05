import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GitHubUser } from "../api/githubUsers";

interface FavoritesState {
  favorites: GitHubUser[];
  addFavorite: (user: GitHubUser) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (user: GitHubUser) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (user) =>
        set((state) => ({
          favorites: [...state.favorites, user],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((u) => u.id !== id),
        })),

      toggleFavorite: (user) => {
        const { favorites } = get();
        const exists = favorites.some((u) => u.id === user.id);
        if (exists) {
          set({
            favorites: favorites.filter((u) => u.id !== user.id),
          });
        } else {
          set({
            favorites: [...favorites, user],
          });
        }
      },

      isFavorite: (id) => {
        return get().favorites.some((u) => u.id === id);
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
