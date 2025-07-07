import type { FC } from 'react';
import type { PokemonDetails } from '@/types/pokemonDetails';
import { StatBar } from './StatBar';

interface StatsProps {
  pokemon: PokemonDetails;
}

export const Stats: FC<StatsProps> = ({ pokemon }) => {
  if (!pokemon.stats || pokemon.stats.length === 0) {
    return <div className="text-gray-500">No stats available</div>;
  }

  return (
    <div className="space-y-3">
      {(() => {
        const primaryType = pokemon.types[0].type.name;
        return pokemon.stats.map(stat => (
          <StatBar
            key={stat.stat.name}
            name={stat.stat.name}
            value={stat.base_stat}
            type={primaryType}
          />
        ));
      })()}
    </div>
  );
};
