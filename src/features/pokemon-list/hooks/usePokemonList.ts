import { useEffect, useState } from 'react';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../api/pokemonApi';

interface UsePokemonListResult {
  pokemonList: Pokemon[];
  total: number;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonList(limit = 20, offset = 0): UsePokemonListResult {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    pokemonApi
      .getPokemonList(limit, offset)
      .then(({ paginatedPokemons, total }) => {
        if (isMounted) {
          setPokemonList(paginatedPokemons);
          setTotal(total);
        }
      })
      .catch(err => {
        if (isMounted) setError(err instanceof Error ? err : new Error('Failed to fetch Pokemons'));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [limit, offset]);

  return {
    pokemonList,
    total,
    isLoading,
    error,
  };
}
