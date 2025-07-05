import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PokemonListPage } from '../pages/PokemonListPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/pokemon" replace />,
  },
  {
    path: '/pokemon',
    element: <PokemonListPage />,
  },
];
