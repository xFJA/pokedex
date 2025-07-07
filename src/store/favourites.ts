import type { Pokemon } from '@/features/pokemon/types/pokemon';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PokemonId = Pokemon['id'];

interface FavoritesState {
  favorites: PokemonId[];
  toggleFavorite: (id: PokemonId) => void;
  isFavorite: (id: PokemonId) => boolean;
  getFavorites: () => PokemonId[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: PokemonId) => {
        set(state => {
          const isFavorite = state.favorites.includes(id);
          if (isFavorite) {
            return { favorites: state.favorites.filter(fav => fav !== id) };
          } else {
            return { favorites: [...state.favorites, id] };
          }
        });
      },
      isFavorite: (id: PokemonId) => {
        return get().favorites.includes(id);
      },
      getFavorites: () => {
        return get().favorites;
      },
    }),
    {
      name: 'favorites-storage',
    },
  ),
);
