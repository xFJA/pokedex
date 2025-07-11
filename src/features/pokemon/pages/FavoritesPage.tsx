import { Link } from 'react-router-dom';
import { useFavoritePokemon } from '@/features/pokemon/hooks/useFavoritePokemon';
import PokemonCard from '@/features/pokemon/components/PokemonCard';
import { PokemonCardSkeleton } from '@/features/pokemon/components/PokemonCard/PokemonCardSkeleton';
import PokeballSpinner from '@/assets/icons/PokeballSpinner.svg?react';

export function FavoritesPage() {
  const { favoritesList, isLoading, isError } = useFavoritePokemon();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <PokeballSpinner className="animate-spin mx-auto" width={64} height={64} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error loading favorites. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (favoritesList.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-gray-500 mb-4">
            You haven&apos;t added any Pokémon to your favorites yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Browse Pokémon
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">My Favorites</h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,220px)]">
        {isLoading
          ? Array.from({ length: 20 }).map((_, idx) => (
              <PokemonCardSkeleton key={`fav-skeleton-${idx}`} />
            ))
          : favoritesList.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
      </div>
    </div>
  );
}
