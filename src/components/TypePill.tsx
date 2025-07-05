import type { FC } from 'react';
import BugIcon from '../assets/icons/bug.svg?react';
import DarkIcon from '../assets/icons/dark.svg?react';
import DragonIcon from '../assets/icons/dragon.svg?react';
import ElectricIcon from '../assets/icons/electric.svg?react';
import FairyIcon from '../assets/icons/fairy.svg?react';
import FightingIcon from '../assets/icons/fighting.svg?react';
import FireIcon from '../assets/icons/fire.svg?react';
import FlyingIcon from '../assets/icons/flying.svg?react';
import GhostIcon from '../assets/icons/ghost.svg?react';
import GrassIcon from '../assets/icons/grass.svg?react';
import GroundIcon from '../assets/icons/ground.svg?react';
import IceIcon from '../assets/icons/ice.svg?react';
import NormalIcon from '../assets/icons/normal.svg?react';
import PoisonIcon from '../assets/icons/poison.svg?react';
import PsychicIcon from '../assets/icons/psychic.svg?react';
import RockIcon from '../assets/icons/rock.svg?react';
import SteelIcon from '../assets/icons/steel.svg?react';
import WaterIcon from '../assets/icons/water.svg?react';

const TYPE_CONFIG: Record<string, { color: string; icon: FC<{ className?: string }> }> = {
  normal: { color: '#A8A77A', icon: NormalIcon },
  fire: { color: '#EE8130', icon: FireIcon },
  water: { color: '#6390F0', icon: WaterIcon },
  electric: { color: '#F7D02C', icon: ElectricIcon },
  grass: { color: '#7AC74C', icon: GrassIcon },
  ice: { color: '#96D9D6', icon: IceIcon },
  fighting: { color: '#C22E28', icon: FightingIcon },
  poison: { color: '#A33EA1', icon: PoisonIcon },
  ground: { color: '#E2BF65', icon: GroundIcon },
  flying: { color: '#A98FF3', icon: FlyingIcon },
  psychic: { color: '#F95587', icon: PsychicIcon },
  bug: { color: '#A6B91A', icon: BugIcon },
  rock: { color: '#B6A136', icon: RockIcon },
  ghost: { color: '#735797', icon: GhostIcon },
  dragon: { color: '#6F35FC', icon: DragonIcon },
  dark: { color: '#705746', icon: DarkIcon },
  steel: { color: '#B7B7CE', icon: SteelIcon },
  fairy: { color: '#D685AD', icon: FairyIcon },
};

export const POKEMON_TYPES = Object.keys(TYPE_CONFIG);

interface TypePillProps {
  type: string;
}

export const TypePill: FC<TypePillProps> = ({ type }) => {
  const normalizedType = type.toLowerCase();
  const typeInfo = TYPE_CONFIG[normalizedType];
  const backgroundColor = typeInfo?.color || '#777777';
  const IconComponent = typeInfo?.icon ? <typeInfo.icon className="w-4 h-4 mr-1" /> : null;

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium`}
      style={{ backgroundColor }}
    >
      {IconComponent}
      <span className="capitalize">{normalizedType}</span>
    </div>
  );
};
