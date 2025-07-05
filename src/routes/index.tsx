import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PokemonListPage } from '@pages/PokemonListPage';
import { PokemonDetailPage } from '@pages/PokemonDetailPage';

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
];
