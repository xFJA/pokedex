import { apiClient } from '@api/apiClient';
import { PokemonDetailsSchema } from '@/features/pokemon/types/pokemon-details';
import { PokemonListResponseSchema, PokemonSchema } from '@/features/pokemon/types/pokemon';
import type { Pokemon } from '@/features/pokemon/types/pokemon';
import type { PokemonDetails } from '@/features/pokemon/types/pokemon-details';

export class PokemonApiService {
  private client;

  constructor(client = apiClient) {
    this.client = client;
  }

  async getPokemonList(
    limit = 20,
    offset = 0,
  ): Promise<{ paginatedPokemons: Pokemon[]; total: number }> {
    const response = await this.client.get(`/pokemon?limit=${limit}&offset=${offset}`);

    const result = PokemonListResponseSchema.safeParse(response);
    if (!result.success) {
      console.error('API response validation error:', result.error.format());
      throw new Error('Invalid data received from Pokémon API');
    }

    const data = result.data;

    const paginatedPokemons = data.results
      .map((pokemon, index) => {
        const id = parseInt(
          pokemon.url.split('/').filter(Boolean).pop() ?? `${offset + index + 1}`,
        );
        const pokemonWithImage = {
          id,
          name: pokemon.name,
          url: pokemon.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };

        const pokemonResult = PokemonSchema.safeParse(pokemonWithImage);
        if (!pokemonResult.success) {
          console.error(
            `Validation error for Pokémon ${pokemon.name}:`,
            pokemonResult.error.format(),
          );
          return null;
        }

        return pokemonResult.data;
      })
      .filter(Boolean as unknown as <T>(x: T | null | undefined) => x is T); // Remove any null entries

    return {
      paginatedPokemons,
      total: data.count,
    };
  }

  async getPokemonById(id: string | number): Promise<PokemonDetails> {
    const response = await this.client.get(`/pokemon/${id}`);

    const result = PokemonDetailsSchema.safeParse(response);
    if (!result.success) {
      console.error(`Validation error for Pokémon ID ${id}:`, result.error.format());
      throw new Error(`Invalid data received for Pokémon ID ${id}`);
    }

    return result.data;
  }
}

export const pokemonApi = new PokemonApiService();
