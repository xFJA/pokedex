import { PokemonCard } from '@/components/PokemonCard';
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
    <div className="w-full">
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(182px,220px))]">
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
