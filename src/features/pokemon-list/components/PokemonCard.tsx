import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PokemonWithTypes } from '../hooks/usePokemonList';

interface PokemonCardProps {
  pokemon: PokemonWithTypes;
}

function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  return typeColors[type] || '#777777';
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <div className="p-4 bg-gray-100">
        <img
          src={
            imageError
              ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
              : pokemon.image
          }
          alt={pokemon.name}
          className="w-full h-40 object-contain mx-auto"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="text-gray-500 text-sm">{formattedId}</span>
        <h3 className="text-lg font-semibold mt-1">{capitalizedName}</h3>
        {pokemon.types && pokemon.types.length > 0 && (
          <div className="flex gap-2 mt-2">
            {pokemon.types.map(typeInfo => (
              <span
                key={typeInfo.type.name}
                className={`text-xs px-2 py-1 rounded-full text-white bg-${typeInfo.type.name} capitalize`}
                style={{
                  backgroundColor: getTypeColor(typeInfo.type.name),
                }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
