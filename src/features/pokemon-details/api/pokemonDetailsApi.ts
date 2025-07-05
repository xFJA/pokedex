import { apiClient } from '../../../core/api/apiClient';
import type { PokemonDetails } from '../types/pokemonDetails';

export const pokemonDetailsApi = {
  async getPokemonById(id: string | number): Promise<PokemonDetails> {
    const data = await apiClient.get<PokemonDetails>(`/pokemon/${id}`);
    return data;
  },
};
