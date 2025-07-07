import { useQueries } from '@tanstack/react-query';
import { useFavoritesStore } from '@/store/favourites';
import { pokemonApi } from '@/features/pokemon/api/pokemonApi';
import { queryKeys } from '@/queryKeys';
import type { PokemonWithTypes } from '@/features/pokemon/hooks/usePokemonList';
import type { PokemonDetails } from '@/features/pokemon/types/pokemon-details';

interface UseFavoritePokemonResult {
  favoritesList: PokemonWithTypes[];
  isLoading: boolean;
  isError: boolean;
}

export function useFavoritePokemon(): UseFavoritePokemonResult {
  const { getFavorites } = useFavoritesStore();
  const favoriteIds = getFavorites();

  const queries = useQueries({
    queries: favoriteIds.map(id => ({
      queryKey: queryKeys.pokemonDetails(id),
      queryFn: () => pokemonApi.getPokemonById(id),
      enabled: favoriteIds.length > 0,
    })),
  });

  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);

  const favoritesList = favoriteIds
    .map(id => {
      const q = queries.find(q => q.data && (q.data as PokemonDetails).id === id);
      const data = q?.data as PokemonDetails | undefined;
      if (!data) return undefined;
      return {
        id: data.id,
        name: data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types ?? [],
      };
    })
    .filter((p): p is PokemonWithTypes => !!p);

  return {
    favoritesList,
    isLoading,
    isError,
  };
}
