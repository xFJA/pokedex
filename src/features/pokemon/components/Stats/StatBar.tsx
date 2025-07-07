import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { TYPE_BG_CLASS, TYPE_TEXT_CLASS } from '@/constants/pokemonTypeClasses';

const MAX_STAT = 255;

interface StatBarProps {
  name: string;
  value: number;
  type: string;
}

const STAT_CONFIG: Record<string, { label: string }> = {
  hp: { label: 'HP' },
  attack: { label: 'Attack' },
  defense: { label: 'Defense' },
  'special-attack': { label: 'Sp. Atk' },
  'special-defense': { label: 'Sp. Def' },
  speed: { label: 'Speed' },
};

export const StatBar: FC<StatBarProps> = ({ name, value, type }) => {
  const [width, setWidth] = useState(0);

  const percentage = Math.min(Math.round((value / MAX_STAT) * 100), 100);
  const statConfig = STAT_CONFIG[name] || { label: name };
  const displayName = statConfig.label;

  const normalizedType = type.toLowerCase();
  const bgBarColor = TYPE_BG_CLASS[normalizedType]?.[100] ?? 'bg-gray-100';
  const textValueColor = TYPE_TEXT_CLASS[normalizedType]?.[900];
  let barColor = TYPE_BG_CLASS[normalizedType]?.[300] ?? 'bg-gray-300';
  if (percentage >= 80) {
    barColor = TYPE_BG_CLASS[normalizedType]?.[700] ?? 'bg-gray-700';
  } else if (percentage >= 50) {
    barColor = TYPE_BG_CLASS[normalizedType]?.[500] ?? 'bg-gray-500';
  }

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(percentage), 50);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="w-16 flex-shrink-0">
        <span className="text-sm font-bold text-gray-700">{displayName}</span>
      </div>
      <div className={`relative flex-1 ${bgBarColor} rounded-full h-6 flex items-center`}>
        <div
          className={`absolute left-0 top-0 h-6 rounded-full ${barColor} transition-[width] duration-1500 ease-in-out`}
          style={{ width: `${width}%` }}
        ></div>
        <span
          className={`absolute text-xs transition-[left] duration-2000 ease-in-out font-semibold ${textValueColor}`}
          style={{ left: width === 0 ? '0' : `calc(${width}% - 3.5rem)` }}
        >
          {value}/{MAX_STAT}
        </span>
      </div>
    </div>
  );
};
