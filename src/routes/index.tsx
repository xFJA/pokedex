import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PokemonListPage } from '@/features/pokemon/pages/PokemonListPage';
import { PokemonDetailPage } from '@/features/pokemon/pages/PokemonDetailPage';
import { FavoritesPage } from '@/features/pokemon/pages/FavoritesPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/pokemon" replace />,
  },
  {
    path: '/pokemon',
    element: <PokemonListPage />,
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetailPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
];
