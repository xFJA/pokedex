import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import PokemonCard from '.';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/utils/format', () => ({
  formatPokemonId: (id: number) => `#${id.toString().padStart(3, '0')}`,
}));

vi.mock('@/store/favourites', () => ({
  useFavoritesStore: () => ({
    isFavorite: (id: number) => mockIsFavorite(id),
    toggleFavorite: (id: number) => mockToggleFavorite(id),
  }),
}));

vi.mock('@/assets/icons/favourite.svg?react', () => ({
  default: ({ fill, stroke, className }: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="favorite-icon" fill={fill} stroke={stroke} className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
}));

vi.mock('react-loading-skeleton', () => ({
  default: ({ height, width }: { height?: number | string; width?: number | string }) => (
    <div data-testid="skeleton" style={{ height, width }}></div>
  ),
}));

const mockNavigate = vi.fn();
const mockIsFavorite = vi.fn();
const mockToggleFavorite = vi.fn();

describe('<PokemonCard />', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: [{ slot: 1, type: { name: 'electric' } }],
    url: 'https://pokeapi.co/api/v2/pokemon/25',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders pokemon information correctly', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>,
    );

    expect(screen.getByText('#025')).not.toBeNull();
    expect(screen.getByText('Pikachu')).not.toBeNull();
    const image = screen.getByAltText('pikachu') as HTMLImageElement;
    expect(image.getAttribute('src')).toBe(mockPokemon.image);
  });

  it('navigates to pokemon detail page when clicked', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>,
    );

    const cardButton = screen.getAllByRole('button')[0];
    fireEvent.click(cardButton);

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/25');
  });

  it('toggles favorite status when favorite button is clicked', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(25);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('displays different favorite button state when pokemon is favorited', () => {
    mockIsFavorite.mockReturnValue(true);

    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('Remove from favorites')).not.toBeNull();
    const favoriteIcon = screen.getByTestId('favorite-icon');
    expect(favoriteIcon.getAttribute('fill')).toBe('currentColor');
  });

  it('handles image loading error correctly', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText('pikachu');
    fireEvent.error(image);

    expect(image.getAttribute('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
    );
  });

  it('renders skeleton loaders when types are not available for types', () => {
    const pokemonWithoutTypes = {
      ...mockPokemon,
      types: [],
    };

    render(
      <MemoryRouter>
        <PokemonCard pokemon={pokemonWithoutTypes} />
      </MemoryRouter>,
    );

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(2);
  });
});
