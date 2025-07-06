import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PokemonWithTypes } from '@features/pokemon-list/hooks/usePokemonList';
import { TypePill } from '@components/TypePill';
import { useFavoritesStore } from '@/store/favourites';
import Favourite from '@/assets/icons/favourite.svg?react';

interface PokemonCardProps {
  pokemon: PokemonWithTypes;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const { id, name, image, types } = pokemon;

  const handleImageError = () => {
    setImageError(true);
  };

  const formattedId = `#${id.toString().padStart(3, '0')}`;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const handleCardClick = () => {
    navigate(`/pokemon/${id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(id);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md border-red-500 border-1 overflow-hidden transition-transform hover:scale-105 cursor-pointer group relative"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-2 right-2 z-10 p-1 rounded-full ${isFavorite(pokemon.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
        aria-label={isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Favourite
          fill={isFavorite(pokemon.id) ? 'currentColor' : 'none'}
          stroke="currentColor"
          className={`w-6 h-6 ${isFavorite(pokemon.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        />
      </button>

      <span className="absolute -top-0.5 -left-0.5 z-10 text-white font-bold text-lg bg-red-500 px-2 rounded-tl-lg rounded-br-lg">
        {formattedId}
      </span>

      <div className="p-4 bg-gray-100">
        <img
          src={
            imageError
              ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
              : image
          }
          alt={name}
          className="w-full h-32 object-contain mx-auto"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="p-3 flex flex-col gap-2 items-center">
        <h3 className="text-lg text-black font-semibold mt-1">{capitalizedName}</h3>
        {types && types.length > 0 && (
          <div className="flex gap-2 mt-2">
            {types.map(typeInfo => (
              <TypePill key={typeInfo.type.name} type={typeInfo.type.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
