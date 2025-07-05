import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PokemonWithTypes } from '@features/pokemon-list/hooks/usePokemonList';
import { TypePill } from '@components/TypePill';

interface PokemonCardProps {
  pokemon: PokemonWithTypes;
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
              <TypePill key={typeInfo.type.name} type={typeInfo.type.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
