import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type { GitHubUser } from "../api/githubUsers";

interface FavoritesState {
  favorites: GitHubUser[];
  toggleFavorite: (user: GitHubUser) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (user) => {
        const { favorites } = get();
        const exists = favorites.some((u) => u.id === user.id);

        if (exists) {
          set({
            favorites: favorites.filter((u) => u.id !== user.id),
          });
          toast.error(`${user.login} removed from favorites`);
        } else {
          set({
            favorites: [...favorites, user],
          });
          toast.success(`${user.login} added to favorites`);
        }
      },

      isFavorite: (id) => get().favorites.some((u) => u.id === id),
    }),
    {
      name: "favorites-storage",
    }
  )
);
