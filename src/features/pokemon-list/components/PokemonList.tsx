import { PokemonCard } from '@/components/PokemonCard';
import { PokemonCardSkeleton } from '@/components/PokemonCardSkeleton';
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

  const skeletonCards = Array.from({ length: 20 }, (_, index) => (
    <PokemonCardSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <div className="w-full">
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,220px)] justify-center md:justify-start">
        {isLoading
          ? skeletonCards
          : pokemonList.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
      </div>
    </div>
  );
}
