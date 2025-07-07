import { useQuery, useQueries, keepPreviousData } from '@tanstack/react-query';
import type { Pokemon } from '@/features/pokemon/types/pokemon';
import { pokemonApi } from '@/features/pokemon/api/pokemonApi';
import { queryKeys } from '@/queryKeys';

export interface PokemonWithTypes extends Pokemon {
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

interface UsePokemonListResult {
  pokemonList: PokemonWithTypes[];
  total: number;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonList(limit = 20, offset = 0): UsePokemonListResult {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.pokemonList(limit, offset),
    queryFn: () => pokemonApi.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const pokemonList = data?.paginatedPokemons ?? [];

  const detailQueries = useQueries({
    queries: pokemonList.map(pokemon => ({
      queryKey: queryKeys.pokemonDetails(pokemon.id),
      queryFn: () => pokemonApi.getPokemonById(pokemon.id),
      staleTime: 10 * 60 * 1000,
      enabled: !isLoading && pokemonList.length > 0,
    })),
  });

  const enrichedList =
    pokemonList.length === 0
      ? []
      : pokemonList.map((pokemon, index) => {
          const details = detailQueries[index].data;
          return { ...pokemon, types: details?.types ?? [] };
        });

  return {
    pokemonList: enrichedList,
    total: data?.total ?? 0,
    isLoading,
    error: error as Error | null,
  };
}
