import { PokemonList } from '../features/pokemon-list/components/PokemonList';
import { usePokemonList } from '../features/pokemon-list/hooks/usePokemonList';

export function PokemonListPage() {
  const { pokemonList, isLoading, error } = usePokemonList(20);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>Error loading Pokémon: {error.message}</p>
            <button className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
              Try Again
            </button>
          </div>
        )}

        <PokemonList pokemonList={pokemonList} isLoading={isLoading} />
      </main>
    </div>
  );
}
