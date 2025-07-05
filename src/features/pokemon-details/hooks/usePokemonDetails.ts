import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@api/pokemonApi';
import { queryKeys } from '@/queryKeys';
import type { PokemonDetails } from '@/types/pokemonDetails';

interface UsePokemonDetailsResult {
  pokemon: PokemonDetails | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonDetails(id: string | number): UsePokemonDetailsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.pokemonDetails(id),
    queryFn: () => pokemonApi.getPokemonById(id),
    enabled: !!id,
  });

  return {
    pokemon: data ?? null,
    isLoading,
    error: error as Error | null,
  };
}
