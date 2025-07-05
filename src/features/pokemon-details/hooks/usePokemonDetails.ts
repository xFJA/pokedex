import { useQuery } from '@tanstack/react-query';
import { pokemonDetailsApi } from '../api/pokemonDetailsApi';
import type { PokemonDetails } from '../types/pokemonDetails';

interface UsePokemonDetailsResult {
  pokemon: PokemonDetails | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonDetails(id: string | number): UsePokemonDetailsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemonDetails', id],
    queryFn: () => pokemonDetailsApi.getPokemonById(id),
    enabled: !!id,
  });

  return {
    pokemon: data ?? null,
    isLoading,
    error: error as Error | null,
  };
}
