export const queryKeys = {
  pokemonList: (limit: number, offset: number) => ['pokemonList', limit, offset] as const,
  pokemonDetails: (id: string | number) => ['pokemonDetails', id] as const,
};
