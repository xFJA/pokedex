import { useQuery, useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Pokemon } from '@features/pokemon-list/types/pokemon';
import { pokemonApi } from '@api/pokemonApi';
import { queryKeys } from '@/queryKeys';

export interface PokemonWithTypes extends Pokemon {
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
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
  });

  const pokemonList = useMemo(() => data?.paginatedPokemons ?? [], [data?.paginatedPokemons]);

  const detailQueries = useQueries({
    queries: pokemonList.map(pokemon => ({
      queryKey: queryKeys.pokemonDetails(pokemon.id),
      queryFn: () => pokemonApi.getPokemonById(pokemon.id),
      enabled: !isLoading && pokemonList.length > 0,
    })),
  });

  const enrichedList = useMemo(() => {
    if (pokemonList.length === 0) {
      return [];
    }
    return pokemonList.map((pokemon, index) => {
      const details = detailQueries[index].data;
      return { ...pokemon, types: details?.types ?? [] };
    });
  }, [pokemonList, detailQueries]);

  return {
    pokemonList: enrichedList,
    total: data?.total ?? 0,
    isLoading,
    error: error as Error | null,
  };
}
