import type { FC } from 'react';

const MAX_STAT = 255;

interface StatBarProps {
  name: string;
  value: number;
}

const STAT_CONFIG: Record<string, { label: string; color: string }> = {
  hp: { label: 'HP', color: 'bg-green-500' },
  attack: { label: 'Attack', color: 'bg-red-500' },
  defense: { label: 'Defense', color: 'bg-blue-500' },
  'special-attack': { label: 'Sp. Atk', color: 'bg-pink-500' },
  'special-defense': { label: 'Sp. Def', color: 'bg-indigo-500' },
  speed: { label: 'Speed', color: 'bg-yellow-400' },
};

export const StatBar: FC<StatBarProps> = ({ name, value }) => {
  const percentage = Math.min(Math.round((value / MAX_STAT) * 100), 100);
  const statConfig = STAT_CONFIG[name] || { label: name, color: 'bg-gray-400' };
  const displayName = statConfig.label;
  const barColor = statConfig.color;

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{displayName}</span>
      </div>
      <div className="relative w-full bg-gray-200 rounded-full h-6 flex items-center">
        <div
          className={`absolute left-0 top-0 h-6 rounded-full ${barColor} transition-all`}
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="absolute right-3 text-xs font-semibold text-black">
          {value}/{MAX_STAT}
        </span>
      </div>
    </div>
  );
};
