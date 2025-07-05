import { useEffect, useState } from 'react';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../api/pokemonApi';

interface UsePokemonListResult {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonList(initialLimit = 20): UsePokemonListResult {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    pokemonApi
      .getPokemonList(initialLimit, 0)
      .then(response => {
        if (isMounted) {
          setPokemonList(pokemonApi.transformPokemonData(response, 0));
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
  }, [initialLimit]);

  return {
    pokemonList,
    isLoading,
    error,
  };
}
