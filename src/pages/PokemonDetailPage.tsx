import { useParams, Link } from 'react-router-dom';
import { usePokemonDetails } from '@features/pokemon-details/hooks/usePokemonDetails';
import { Stats } from '@features/pokemon-details/components/Stats';
import { TypePill } from '@components/TypePill';
import { MovesList } from '@features/pokemon-details/components/MovesList';
import BackIcon from '@assets/icons/back.svg?react';

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
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            BACK
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
          <Link to="/pokemon" className="inline-flex items-center text-red-600 hover:text-red-800">
            <BackIcon />
            BACK
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col">
            <div
              className="p-8 flex items-center justify-center relative z-10 min-h-[300px] rounded-t-lg overflow-hidden"
              style={{
                background:
                  pokemon.types.length > 1
                    ? `linear-gradient(135deg, var(--color-type-${pokemon.types[0].type.name.toLowerCase()}-500) 0%, var(--color-type-${pokemon.types[1].type.name.toLowerCase()}-500) 100%)`
                    : `var(--color-type-${pokemon.types[0].type.name.toLowerCase()}-500)`,
                boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white opacity-10 translate-x-1/4 translate-y-1/4"></div>
              {/* Pokémon image with drop shadow effect */}
              <div className="relative z-20">
                <div
                  className="absolute -inset-1 blur-lg opacity-30"
                  style={{
                    background:
                      pokemon.types.length > 1
                        ? `radial-gradient(circle, var(--color-type-${pokemon.types[0].type.name.toLowerCase()}-300), var(--color-type-${pokemon.types[1].type.name.toLowerCase()}-300))`
                        : `var(--color-type-${pokemon.types[0].type.name.toLowerCase()}-300)`,
                  }}
                />
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  alt={pokemon.name}
                  className="w-64 mx-auto drop-shadow-2xl relative z-30 transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                <span className="text-2xl font-bold text-gray-500">
                  #{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-xl text-black font-semibold mb-2">Types</h2>
                <div className="flex gap-2">
                  {pokemon.types.map(typeInfo => (
                    <TypePill key={typeInfo.type.name} type={typeInfo.type.name} />
                  ))}
                </div>
              </div>
              <Stats pokemon={pokemon} />
              <MovesList moves={pokemon.moves} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
