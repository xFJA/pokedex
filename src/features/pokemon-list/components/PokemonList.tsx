import { PokemonCard } from './PokemonCard';
import type { PokemonWithTypes } from '@features/pokemon-list/hooks/usePokemonList';

interface PokemonListProps {
  pokemonList: PokemonWithTypes[];
  isLoading: boolean;
  isTypesLoading?: boolean;
}

export function PokemonList({ pokemonList, isLoading }: PokemonListProps) {
  if (pokemonList.length === 0 && !isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList.map(pokemon => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
