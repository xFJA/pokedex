import { apiClient } from '@api/apiClient';
import type { Pokemon, PokemonListResponse } from '@features/pokemon-list/types/pokemon';

export const pokemonApi = {
  async getPokemonList(
    limit = 20,
    offset = 0,
  ): Promise<{ paginatedPokemons: Pokemon[]; total: number }> {
    const data = await apiClient.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );
    const paginatedPokemons = data.results.map((pokemon, index) => {
      const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() ?? `${offset + index + 1}`);
      return {
        id,
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });
    return {
      paginatedPokemons,
      total: data.count,
    };
  },
};
