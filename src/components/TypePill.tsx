import type { FC } from 'react';
import BugIcon from '@assets/icons/bug.svg?react';
import DarkIcon from '@assets/icons/dark.svg?react';
import DragonIcon from '@assets/icons/dragon.svg?react';
import ElectricIcon from '@assets/icons/electric.svg?react';
import FairyIcon from '@assets/icons/fairy.svg?react';
import FightingIcon from '@assets/icons/fighting.svg?react';
import FireIcon from '@assets/icons/fire.svg?react';
import FlyingIcon from '@assets/icons/flying.svg?react';
import GhostIcon from '@assets/icons/ghost.svg?react';
import GrassIcon from '@assets/icons/grass.svg?react';
import GroundIcon from '@assets/icons/ground.svg?react';
import IceIcon from '@assets/icons/ice.svg?react';
import NormalIcon from '@assets/icons/normal.svg?react';
import PoisonIcon from '@assets/icons/poison.svg?react';
import PsychicIcon from '@assets/icons/psychic.svg?react';
import RockIcon from '@assets/icons/rock.svg?react';
import SteelIcon from '@assets/icons/steel.svg?react';
import WaterIcon from '@assets/icons/water.svg?react';

const TYPE_ICON: Record<string, FC<React.SVGProps<SVGSVGElement>>> = {
  normal: NormalIcon,
  fire: FireIcon,
  water: WaterIcon,
  electric: ElectricIcon,
  grass: GrassIcon,
  ice: IceIcon,
  fighting: FightingIcon,
  poison: PoisonIcon,
  ground: GroundIcon,
  flying: FlyingIcon,
  psychic: PsychicIcon,
  bug: BugIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  fairy: FairyIcon,
};

interface TypePillProps {
  type: string;
}

import { TYPE_BG_CLASS } from '@/constants/pokemonTypeClasses';

export const TypePill: FC<TypePillProps> = ({ type }) => {
  const normalizedType = type.toLowerCase();
  const Icon = TYPE_ICON[normalizedType];
  const bgClass = TYPE_BG_CLASS[normalizedType]?.[500] ?? 'bg-gray-500';

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium ${bgClass}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-1" />}
      <span className="capitalize">{normalizedType}</span>
    </div>
  );
};
