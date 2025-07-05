import { apiClient } from '../../../core/api/apiClient';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

export const pokemonApi = {
  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    return apiClient.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  },

  transformPokemonData(data: PokemonListResponse, offset = 0): Pokemon[] {
    return data.results.map((pokemon, index) => {
      const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || `${offset + index + 1}`);
      
      return {
        id,
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      };
    });
  }
};
