import { useQuery } from '@tanstack/react-query';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../api/pokemonApi';

interface UsePokemonListResult {
  pokemonList: Pokemon[];
  total: number;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonList(limit = 20, offset = 0): UsePokemonListResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => pokemonApi.getPokemonList(limit, offset),
  });
  return {
    pokemonList: data?.paginatedPokemons ?? [],
    total: data?.total ?? 0,
    isLoading,
    error: error as Error | null,
  };
}
