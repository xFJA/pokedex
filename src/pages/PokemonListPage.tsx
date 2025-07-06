import { useState } from 'react';
import { PokemonList } from '@features/pokemon-list/components/PokemonList';
import { usePokemonList } from '@features/pokemon-list/hooks/usePokemonList';
import { usePagination } from '@hooks/usePagination';
import Pagination from '@components/Pagination';

const PAGE_SIZE = 20;
const SIBLING_COUNT = 1;

export function PokemonListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const { pokemonList, total, isLoading, error } = usePokemonList(PAGE_SIZE, offset);

  const { totalPages } = usePagination({
    totalCount: total,
    pageSize: PAGE_SIZE,
    currentPage,
    siblingCount: SIBLING_COUNT,
  });

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>Error loading Pokémon: {error.message}</p>
          <button className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
            Try Again
          </button>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        siblingCount={SIBLING_COUNT}
      />

      <PokemonList pokemonList={pokemonList} isLoading={isLoading} />
    </div>
  );
}
