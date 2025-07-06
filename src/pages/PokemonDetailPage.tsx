import { useParams, Link } from 'react-router-dom';
import { usePokemonDetails } from '@features/pokemon-details/hooks/usePokemonDetails';
import { Stats } from '@features/pokemon-details/components/Stats';
import { TypePill } from '@components/TypePill';
import { MovesList } from '@features/pokemon-details/components/MovesList';

export function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { pokemon, isLoading, error } = usePokemonDetails(id ?? '');

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <Link
            to="/pokemon"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Back to Pokémon List
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700">Loading Pokémon details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <Link
            to="/pokemon"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Pokémon List
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-50 p-6 flex items-center justify-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={pokemon.name}
                className="w-full max-w-xs"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                <span className="text-2xl font-bold text-gray-500">
                  #{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Types</h2>
                <div className="flex gap-2">
                  {pokemon.types.map(typeInfo => (
                    <TypePill key={typeInfo.type.name} type={typeInfo.type.name} />
                  ))}
                </div>
              </div>
              <MovesList moves={pokemon.moves} />
              <Stats pokemon={pokemon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
