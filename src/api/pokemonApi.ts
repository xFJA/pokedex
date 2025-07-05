import { apiClient } from '@api/apiClient';
import type { Pokemon, PokemonListResponse } from '@features/pokemon-list/types/pokemon';
import type { PokemonDetails } from '@/types/pokemonDetails';

export class PokemonApiService {
  private client;

  constructor(client = apiClient) {
    this.client = client;
  }

  async getPokemonList(
    limit = 20,
    offset = 0,
  ): Promise<{ paginatedPokemons: Pokemon[]; total: number }> {
    const data = await this.client.get<PokemonListResponse>(
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
  }

  async getPokemonById(id: string | number): Promise<PokemonDetails> {
    const data = await this.client.get<PokemonDetails>(`/pokemon/${id}`);
    return data;
  }
}

export const pokemonApi = new PokemonApiService();
