import React from 'react';
import type { PokemonDetails } from '@/types/pokemonDetails';

type PokemonMove = PokemonDetails['moves'][number];

interface MovesListProps {
  moves: PokemonMove[];
}

export const MovesList: React.FC<MovesListProps> = ({ moves }) => {
  if (!moves || moves.length === 0) {
    return <div className="text-gray-500">No moves available</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Moves</h2>
      <div className="flex p-3 flex-wrap gap-2 max-h-60 overflow-y-auto">
        {moves.map((moveInfo: PokemonMove) => {
          const formattedName = moveInfo.move.name
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <div
              key={moveInfo.move.name}
              className="bg-white rounded-full px-4 py-2 text-black text-sm border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              {formattedName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
