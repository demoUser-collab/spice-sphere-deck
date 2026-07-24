import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppNotification, User } from "@/types";
import { NOTIFICATIONS, CURRENT_USER } from "@/data/mock";

type Theme = "light" | "dark" | "system";

interface AppState {
  theme: Theme;
  setTheme: (t: Theme) => void;

  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;

  likes: string[];
  toggleLike: (id: string) => void;

  recentSearches: string[];
  pushSearch: (q: string) => void;
  clearSearches: () => void;

  recentlyViewed: string[];
  pushViewed: (id: string) => void;

  notifications: AppNotification[];
  markAllRead: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (t) => set({ theme: t }),

      user: CURRENT_USER,
      isAuthenticated: true,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      favorites: [],
      toggleFavorite: (id) =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter((x) => x !== id)
            : [...get().favorites, id],
        }),

      likes: [],
      toggleLike: (id) =>
        set({
          likes: get().likes.includes(id)
            ? get().likes.filter((x) => x !== id)
            : [...get().likes, id],
        }),

      recentSearches: [],
      pushSearch: (q) => {
        const t = q.trim();
        if (!t) return;
        set({ recentSearches: [t, ...get().recentSearches.filter((x) => x !== t)].slice(0, 8) });
      },
      clearSearches: () => set({ recentSearches: [] }),

      recentlyViewed: [],
      pushViewed: (id) => set({ recentlyViewed: [id, ...get().recentlyViewed.filter((x) => x !== id)].slice(0, 12) }),

      notifications: NOTIFICATIONS,
      markAllRead: () => set({ notifications: get().notifications.map((n) => ({ ...n, read: true })) }),
    }),
    { name: "recipe-hub" }
  )
);
